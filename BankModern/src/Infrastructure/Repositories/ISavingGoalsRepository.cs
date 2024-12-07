using BankModern.src.Domain.Entities;

namespace BankModern.src.Infrastructure.Repositories
{
    public interface ISavingGoalsRepository
    {
        Task<SavingGoals> GetByIdAsync(Guid accountId);
        Task<IEnumerable<SavingGoals>> GetByUserIdAsync(Guid userId);
        Task<decimal> GetBalanceAsync(Guid accountId);
        Task AddAsync(SavingGoals savingsAccount);
        Task DeleteAsync(Guid accountId);
    }
}
