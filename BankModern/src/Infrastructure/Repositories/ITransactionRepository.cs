using BankModern.src.Domain.Entities;
using BankModern.src.Domain.Enums;

namespace BankModern.src.Infrastructure.Repositories
{
    public interface ITransactionRepository
    {
        Task<Transaction> GetByIdAsync(Guid transactionId);
        Task<IEnumerable<Transaction>> GetByAccountIdAsync(Guid accountId);
        Task<IEnumerable<Transaction>> GetByUserIdAsync(Guid userId);
        Task<IEnumerable<Transaction>> GetByTypeAsync(TransactionType type);
        Task<IEnumerable<Transaction>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<decimal> GetTotalTransactionsAmountAsync(Guid userId, string transactionType, DateTime? startDate = null, DateTime? endDate = null);
        Task<bool> CreateAsync(Transaction transaction);
        Task<IEnumerable<Transaction>> GetTransactionHistoryAsync(Guid userId, DateTime? startDate = null, DateTime? endDate = null);
    }
}
