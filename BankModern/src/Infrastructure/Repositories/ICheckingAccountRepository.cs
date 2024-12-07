using BankModern.src.Domain.Entities;

namespace BankModern.src.Infrastructure.Repositories
{
    public interface ICheckingAccountRepository
    {
        Task<CheckingAccount> GetByUserIdAsync(Guid userId);
        Task<CheckingAccount> GetByAccountIdAsync(Guid accountId);
        Task<bool> CreateAsync(CheckingAccount account);
        Task<bool> UpdateAsync(CheckingAccount account);
        Task<decimal> GetBalanceAsync(Guid userId);
        Task<bool> UpdateBalanceAsync(Guid userId, decimal newBalance);
    }
}
