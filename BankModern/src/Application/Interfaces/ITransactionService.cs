using BankModern.src.Application.DTOs;
using BankModern.src.Domain.Enums;

namespace BankModern.src.Application.Interfaces
{
    public interface ITransactionService
    {
        Task<GeneralResponseDto> DepositAsync(Guid accountId, decimal amount, AccountType accountType);
        Task<GeneralResponseDto> WithdrawAsync(Guid accountId, decimal amount, AccountType accountType);
        Task<GeneralResponseDto> TransferAsync(TransactionDto transferRequest);
        Task<GeneralResponseDto> ContributeToGoalAsync(Guid userId, decimal amount, Guid goalId);
        Task<IEnumerable<TransactionDto>> GetTransactionHistoryAsync(Guid accountId); // Fetch transaction history for an account.
    }
}
