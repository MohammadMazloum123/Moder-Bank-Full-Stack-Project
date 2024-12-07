using BankModern.src.Application.DTOs;
using BankModern.src.Application.Interfaces;
using BankModern.src.Domain.Enums;
using BankModern.src.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BankModern.src.Application.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly BankingDbContext _context;
        public HistoryService(BankingDbContext context)
        {
            _context = context;
        }
        public async Task<TransactionsHistoryDto> GetAllTransactionsAsync(Guid accountId)
        {
            // Fetch the account and user details
            var account = await _context.CheckingAccounts
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == accountId);

            if (account == null)
            {
                throw new KeyNotFoundException("Account not found.");
            }

            // Fetch all transactions related to the account
            var transactions = await _context.Transactions
                .Where(t => t.SourceAccountId == accountId || t.DestinationAccountId == accountId)
                .ToListAsync();

            // Summarize transaction data
            var totalDeposits = transactions
                .Where(t => t.Type == TransactionType.Deposit && t.SourceAccountId == accountId)
                .Sum(t => t.Amount);

            var totalWithdrawals = transactions
                .Where(t => t.Type == TransactionType.Withdraw && t.SourceAccountId == accountId)
                .Sum(t => t.Amount);

            var totalTransfers = transactions
                .Where(t => t.Type == TransactionType.Transfer && t.SourceAccountId == accountId)
                .Sum(t => t.Amount);

            var totalContributions = transactions
                .Where(t => t.Type == TransactionType.Contribution && t.SourceAccountId == accountId)
                .Sum(t => t.Amount);

            // Map transactions to TransactionDto
            var transactionDtos = transactions.Select(t => new TransactionDto
            {
                Id = t.Id,
                Amount = t.Amount,
                TransactionDate = t.TransactionDate,
                TransactionType = t.Type.ToString(), // Convert enum to string for the DTO
                SourceAccountId = t.SourceAccountId,
                DestinationAccountId = t.DestinationAccountId
            })
            .ToList();

            // Prepare the result DTO
            var result = new TransactionsHistoryDto
            {
                UserId = account.User.Id,
                Username = account.User.UserName,
                TotalDeposits = totalDeposits,
                TotalWithdrawals = totalWithdrawals,
                TotalTransfers = totalTransfers,
                TotalContributions = totalContributions,
                Transactions = transactionDtos
            };

            return result;
        }

        public async Task<TransactionsHistoryDto> GetExpenseReportAsync(Guid userId)
        {
            var user = await _context.Users
               .Include(u => u.CheckingAccounts)
               .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }

            var accountIds = user.CheckingAccounts.Select(a => a.Id);

            var transactions = await _context.Transactions
                .Where(t => accountIds.Contains(t.SourceAccountId) || accountIds.Contains(t.DestinationAccountId))
                .ToListAsync();

            var totalExpenses = transactions
                .Where(t => t.TransactionType == "Withdraw" || t.TransactionType == "Transfer")
                .Sum(t => t.Amount);

            var transactionDtos = transactions.Select(t => new TransactionDto
            {
                Id = t.Id,
                Amount = t.Amount,
                TransactionDate = t.TransactionDate,
                TransactionType = t.TransactionType,
                SourceAccountId = t.SourceAccountId,
                DestinationAccountId = t.DestinationAccountId
            }).ToList();

            return new TransactionsHistoryDto
            {
                UserId = user.Id,
                Username = user.UserName,
                TotalDeposits = 0,
                TotalWithdrawals = transactions.Where(t => t.TransactionType == "Withdraw").Sum(t => t.Amount),
                TotalTransfers = transactions.Where(t => t.TransactionType == "Transfer").Sum(t => t.Amount),
                TotalContributions = 0,
                Transactions = transactionDtos
            };
        }

        public async Task<IEnumerable<TransactionsHistoryDto>> GetHistoryByTransactionTypeAsync(string transactionType)
        {
            // Try to parse the string into the TransactionType enum
            if (!Enum.TryParse<TransactionType>(transactionType, true, out var transactionTypeEnum))
            {
                throw new ArgumentException("Invalid transaction type provided.");
            }

            // Query the database for transactions with the matching enum value
            var transactions = await _context.Transactions
                .Where(t => t.Type == transactionTypeEnum) // Compare enums
                .Include(t => t.SourceAccount.User) // Include user for context
                .ToListAsync();

            // Process the grouped results into DTOs
            var groupedTransactions = transactions
                .GroupBy(t => t.SourceAccount.User.Id)
                .Select(group => new TransactionsHistoryDto
                {
                    UserId = group.Key,
                    Username = group.First().SourceAccount.User.UserName,
                    TotalDeposits = group.Where(t => t.Type == TransactionType.Deposit).Sum(t => t.Amount),
                    TotalWithdrawals = group.Where(t => t.Type == TransactionType.Withdraw).Sum(t => t.Amount),
                    TotalTransfers = group.Where(t => t.Type == TransactionType.Transfer).Sum(t => t.Amount),
                    TotalContributions = group.Where(t => t.Type == TransactionType.Contribution).Sum(t => t.Amount),

                    Transactions = group.Select(t => new TransactionDto
                    {
                        Id = t.Id,
                        Amount = t.Amount,
                        TransactionDate = t.TransactionDate,
                        TransactionType = t.Type.ToString(), // Convert enum to string for DTO
                        SourceAccountId = t.SourceAccountId,
                        DestinationAccountId = t.DestinationAccountId
                    })
                    .ToList()
                });

            return groupedTransactions;
        }

        public async Task<IEnumerable<TransactionsHistoryDto>> GetHistoryByTransferTypeAsync(string transactionType)
        {
            // Try to parse the string into the TransactionType enum
            if (!Enum.TryParse<TransactionType>(transactionType, true, out var transactionTypeEnum))
            {
                throw new ArgumentException("Invalid transaction type provided.");
            }

            // Query transactions that match the parsed transaction type
            var transactions = await _context.Transactions
                .Where(t => t.Type == transactionTypeEnum)
                .Include(t => t.SourceAccount.User) // Assuming User navigation property exists
                .ToListAsync();

            // Group by user and prepare the result
            var groupedTransactions = transactions
                .GroupBy(t => t.SourceAccount.User.Id)
                .Select(group => new TransactionsHistoryDto
                {
                    UserId = group.Key,
                    Username = group.First().SourceAccount.User.UserName,
                    TotalDeposits = group.Where(t => t.Type == TransactionType.Deposit).Sum(t => t.Amount),
                    TotalWithdrawals = group.Where(t => t.Type == TransactionType.Withdraw).Sum(t => t.Amount),
                    TotalTransfers = group.Where(t => t.Type == TransactionType.Transfer).Sum(t => t.Amount),
                    TotalContributions = 0, // Adjust if contributions need to be calculated
                    Transactions = group.Select(t => new TransactionDto
                    {
                        Id = t.Id,
                        Amount = t.Amount,
                        TransactionDate = t.TransactionDate,
                        TransactionType = t.Type.ToString(),
                        SourceAccountId = t.SourceAccountId,
                        DestinationAccountId = t.DestinationAccountId
                    }).ToList()
                });

            return groupedTransactions;
        }

        public async Task<IEnumerable<TransactionsHistoryDto>> GetHistoryByWithdrawTypeAsync(string transactionType)
        {
            // Fetch transactions of type Withdrawal
            var withdrawals = await _context.Transactions
                .Where(t => t.Type == TransactionType.Withdraw)
                .Include(t => t.SourceAccount.User)
                .ToListAsync();

            var groupedWithdrawals = withdrawals.GroupBy(t => t.SourceAccount.User.Id)
                .Select(group => new TransactionsHistoryDto
                {
                    UserId = group.Key,
                    Username = group.First().SourceAccount.User.UserName,
                    TotalWithdrawals = group.Sum(t => t.Amount),
                    Transactions = group.Select(t => new TransactionDto
                    {
                        Id = t.Id,
                        Amount = t.Amount,
                        TransactionDate = t.TransactionDate,
                        TransactionType = t.Type.ToString(),
                        SourceAccountId = t.SourceAccountId,
                        DestinationAccountId = t.DestinationAccountId
                    })
                    .ToList()
                });

            return groupedWithdrawals;
        }
    }
}
