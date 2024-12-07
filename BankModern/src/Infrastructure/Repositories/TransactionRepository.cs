using BankModern.src.Domain.Entities;
using BankModern.src.Domain.Enums;
using BankModern.src.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BankModern.src.Infrastructure.Repositories
{
        public class TransactionRepository : ITransactionRepository
        {
            private readonly BankingDbContext _context;
            private readonly ILogger<TransactionRepository> _logger;

            public TransactionRepository(BankingDbContext context, ILogger<TransactionRepository> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Transaction> GetByIdAsync(Guid transactionId)
            {
                return await _context.Transactions.FindAsync(transactionId);
            }

            public async Task<IEnumerable<Transaction>> GetByAccountIdAsync(Guid accountId)
            {
                return await _context.Transactions
                    .Where(t => t.SourceAccountId == accountId)
                    .OrderByDescending(t => t.TransactionDate)
                    .ToListAsync();
            }

            public async Task<IEnumerable<Transaction>> GetByUserIdAsync(Guid userId)
            {
                return await _context.Transactions
                    .Where(t => t.Id == userId)
                    .OrderByDescending(t => t.TransactionDate)
                    .ToListAsync();
            }

            public async Task<IEnumerable<Transaction>> GetByTypeAsync(TransactionType type)
            {
                return await _context.Transactions
                    .Where(t => t.Type == type)
                    .OrderByDescending(t => t.TransactionDate)
                    .ToListAsync();
            }

            public async Task<IEnumerable<Transaction>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
            {
                return await _context.Transactions
                    .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= endDate)
                    .OrderByDescending(t => t.TransactionDate)
                    .ToListAsync();
            }

            public async Task<decimal> GetTotalTransactionsAmountAsync(Guid userId, string transactionType, DateTime? startDate = null, DateTime? endDate = null)
            {
                var query = _context.Transactions.Where(t => t.Id == userId);

                if (!string.IsNullOrEmpty(transactionType))
                {
                    query = query.Where(t => t.Type.ToString() == transactionType);
                }

                if (startDate.HasValue)
                {
                    query = query.Where(t => t.TransactionDate >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    query = query.Where(t => t.TransactionDate <= endDate.Value);
                }

                return await query.SumAsync(t => t.Amount);
            }

            public async Task<bool> CreateAsync(Transaction transaction)
            {
                try
                {
                    await _context.Transactions.AddAsync(transaction);
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error creating transaction");
                    return false;
                }
            }

            public async Task<IEnumerable<Transaction>> GetTransactionHistoryAsync(Guid userId, DateTime? startDate = null, DateTime? endDate = null)
            {
                var query = _context.Transactions.Where(t => t.Id == userId);

                if (startDate.HasValue)
                {
                    query = query.Where(t => t.TransactionDate >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    query = query.Where(t => t.TransactionDate <= endDate.Value);
                }

                return await query.OrderByDescending(t => t.TransactionDate).ToListAsync();
            }
        }
    }
