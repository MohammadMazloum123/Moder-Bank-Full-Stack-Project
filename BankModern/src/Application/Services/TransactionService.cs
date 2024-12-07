using BankModern.src.Application.DTOs;
using BankModern.src.Application.Interfaces;
using BankModern.src.Domain.Entities;
using BankModern.src.Domain.Enums;
using BankModern.src.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BankModern.src.Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly BankingDbContext _context;
        public TransactionService(BankingDbContext context)
        {
            _context = context;
        }
        public async Task<GeneralResponseDto> ContributeToGoalAsync(Guid userId, decimal amount, Guid goalId)
        {
            if (amount <= 0)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Contribution amount must be positive.",
                    StatusCode = 400
                };
            }

            // Retrieve the savings goal
            var goal = await _context.SavingGoals.FirstOrDefaultAsync(g => g.Id == goalId && g.CheckingAccount.UserId == userId);
            if (goal == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Goal not found.",
                    StatusCode = 404
                };
            }

            // Retrieve the checking account associated with the goal
            var checkingAccount = await _context.CheckingAccounts.FirstOrDefaultAsync(c => c.Id == goal.CheckingAccountId);
            if (checkingAccount == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Checking account not found.",
                    StatusCode = 404
                };
            }

            // Check if the checking account has sufficient funds
            if (checkingAccount.Balance < amount)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Insufficient funds in checking account.",
                    StatusCode = 400
                };
            }

            // Deduct from the checking account balance
            checkingAccount.Balance -= amount;

            // Create the transaction for the contribution
            var transaction = new Transaction
            {
                TransactionDate = DateTime.UtcNow,
                Amount = amount,
                Type = TransactionType.Contribution,
                SourceAccountId = checkingAccount.Id,
                DestinationAccountId = goal.CheckingAccountId, // Assuming goal's checking account is the destination
                TransactionHistoryId = Guid.NewGuid() // Generate a new TransactionHistory ID
            };

            // Add transaction history and transaction to the database
            var transactionHistory = new TransactionsHistory
            {
                Id = transaction.TransactionHistoryId,
                TransactionDate = transaction.TransactionDate,
                TransactionType = TransactionType.Contribution,
                Amount = amount
            };

            await _context.TransactionsHistory.AddAsync(transactionHistory);
            await _context.Transactions.AddAsync(transaction);

            // Update the goal progress
            goal.CurrentAmount += amount;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return new GeneralResponseDto
            {
                Success = true,
                Message = "Contribution successful.",
                StatusCode = 200
            };
        }

        public async Task<GeneralResponseDto> DepositAsync(Guid accountId, decimal amount, AccountType accountType)
        {
            if (amount <= 0)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Deposit amount must be positive.",
                    StatusCode = 400
                };
            }

            // Retrieve the account to deposit into
            var account = accountType == AccountType.Checking
                ? await _context.CheckingAccounts.FirstOrDefaultAsync(a => a.Id == accountId)
                : null;

            if (account == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Account not found.",
                    StatusCode = 404
                };
            }

            // Update account balance
            account.Balance += amount;

            // Create transaction for deposit
            var transaction = new Transaction
            {
                TransactionDate = DateTime.UtcNow,
                Amount = amount,
                Type = TransactionType.Deposit,
                SourceAccountId = accountId,
                DestinationAccountId = accountId,
                TransactionHistoryId = Guid.NewGuid() // Generate a new TransactionHistory ID
            };

            // Add transaction history and transaction to database
            var transactionHistory = new TransactionsHistory
            {
                Id = transaction.TransactionHistoryId,
                TransactionDate = transaction.TransactionDate,
                TransactionType = TransactionType.Deposit,
                Amount = amount
            };

            await _context.TransactionsHistory.AddAsync(transactionHistory);
            await _context.Transactions.AddAsync(transaction);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return new GeneralResponseDto
            {
                Success = true,
                Message = "Deposit successful.",
                StatusCode = 200
            };
        }

        public async Task<IEnumerable<TransactionDto>> GetTransactionHistoryAsync(Guid accountId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.SourceAccountId == accountId || t.DestinationAccountId == accountId)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();

            // Map to DTO (assuming TransactionDto is already defined)
            var transactionDtos = transactions.Select(t => new TransactionDto
            {
                Id = t.Id,
                Amount = t.Amount,
                TransactionDate = t.TransactionDate,
                TransactionType = t.Type,
                SourceAccountId = t.SourceAccountId,
                DestinationAccountId = t.DestinationAccountId
            });

            return transactionDtos;
        }

        public async Task<GeneralResponseDto> TransferAsync(TransactionDto transferRequest)
        {
            if (transferRequest.Amount <= 0)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Transfer amount must be positive.",
                    StatusCode = 400
                };
            }

            // Retrieve the source and destination accounts
            var sourceAccount = await _context.CheckingAccounts.FirstOrDefaultAsync(a => a.Id == transferRequest.SourceAccountId);
            var destinationAccount = await _context.CheckingAccounts.FirstOrDefaultAsync(a => a.Id == transferRequest.DestinationAccountId);

            if (sourceAccount == null || destinationAccount == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Source or destination account not found.",
                    StatusCode = 404
                };
            }

            // Check if the source account has enough balance
            if (sourceAccount.Balance < transferRequest.Amount)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Insufficient funds in the source account.",
                    StatusCode = 400
                };
            }

            // Deduct from source account and add to destination account
            sourceAccount.Balance -= transferRequest.Amount;
            destinationAccount.Balance += transferRequest.Amount;

            // Create the transaction
            var transaction = new Transaction
            {
                TransactionDate = DateTime.UtcNow,
                Amount = transferRequest.Amount,
                Type = TransactionType.Transfer,
                SourceAccountId = transferRequest.SourceAccountId,
                DestinationAccountId = transferRequest.DestinationAccountId,
                TransactionHistoryId = Guid.NewGuid() // Generate a new TransactionHistory ID
            };

            // Add transaction history and transaction to the database
            var transactionHistory = new TransactionsHistory
            {
                Id = transaction.TransactionHistoryId,
                TransactionDate = transaction.TransactionDate,
                TransactionType = TransactionType.Transfer,
                Amount = transferRequest.Amount
            };

            await _context.TransactionsHistory.AddAsync(transactionHistory);
            await _context.Transactions.AddAsync(transaction);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return new GeneralResponseDto
            {
                Success = true,
                Message = "Transfer successful.",
                StatusCode = 200
            };
        }

        public async Task<GeneralResponseDto> WithdrawAsync(Guid accountId, decimal amount, AccountType accountType)
        {
            if(amount <= 0)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Withdrawal amount must be positive.",
                    StatusCode = 400
                };
            }

            // Retrieve the account to withdraw from
            var account = accountType == AccountType.Checking
                ? await _context.CheckingAccounts.FirstOrDefaultAsync(a => a.Id == accountId)
                : null;

            if (account == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Account not found.",
                    StatusCode = 404
                };
            }

            // Check if the account has sufficient funds
            if (account.Balance < amount)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Insufficient funds.",
                    StatusCode = 400
                };
            }

            // Update account balance
            account.Balance -= amount;

            // Create transaction for withdrawal
            var transaction = new Transaction
            {
                TransactionDate = DateTime.UtcNow,
                Amount = amount,
                Type = TransactionType.Withdraw,
                SourceAccountId = accountId,
                DestinationAccountId = accountId,
                TransactionHistoryId = Guid.NewGuid() // Generate a new TransactionHistory ID
            };

            // Add transaction history and transaction to database
            var transactionHistory = new TransactionsHistory
            {
                Id = transaction.TransactionHistoryId,
                TransactionDate = transaction.TransactionDate,
                TransactionType = TransactionType.Withdraw,
                Amount = amount
            };

            await _context.TransactionsHistory.AddAsync(transactionHistory);
            await _context.Transactions.AddAsync(transaction);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return new GeneralResponseDto
            {
                Success = true,
                Message = "Withdrawal successful.",
                StatusCode = 200
            };
        }
    }
}
