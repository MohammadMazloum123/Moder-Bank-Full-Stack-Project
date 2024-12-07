using BankModern.src.Application.DTOs;

namespace BankModern.src.Application.Interfaces
{
    public interface IHistoryService
    {
        Task<TransactionsHistoryDto> GetExpenseReportAsync(Guid userId);
        Task<TransactionsHistoryDto> GetAllTransactionsAsync(Guid accountId);
        Task<IEnumerable<TransactionsHistoryDto>> GetHistoryByTransactionTypeAsync(string transactionType);
        Task<IEnumerable<TransactionsHistoryDto>> GetHistoryByWithdrawTypeAsync(string transactionType);
        Task<IEnumerable<TransactionsHistoryDto>> GetHistoryByTransferTypeAsync(string transactionType);
    }
}
