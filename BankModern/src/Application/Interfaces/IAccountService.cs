using BankModern.src.Application.DTOs;

namespace BankModern.src.Application.Interfaces
{
    public interface IAccountService
    {
        // Read-only account operations since accounts are created at registration
        Task<CheckingAccountDto> GetCheckingAccountAsync(Guid userId);
        Task<decimal> GetAccountBalanceAsync(Guid userId);
        // Balance Operations
        Task<GeneralResponseDto> ValidateBalanceAsync(Guid accountId, decimal amount);

        // User Account Information
        Task<ApplicationUserDto> GetUserInfoAsync(Guid userId);
        Task<bool> AccountExistsAsync(Guid accountId);
        Task<bool> IsAccountOwnerAsync(Guid userId, Guid accountId);
        // Account verification
        Task<bool> HasSufficientFundsAsync(Guid userId, decimal amount);
        Task<bool> IsAccountActiveAsync(Guid userId);
    }
}
