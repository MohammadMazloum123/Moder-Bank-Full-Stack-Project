using BankModern.src.Application.DTOs;

namespace BankModern.src.Application.Interfaces
{
    public interface IGoalService
    {
        Task<GeneralResponseDto> CreateSavingsGoalAsync(SavingsGoalDto createGoalDto);
        Task<IEnumerable<SavingsGoalDto>> GetUserSavingsGoalsAsync(Guid userId);
        Task<SavingGoalsProgressDto> GetSavingsGoalProgressAsync(Guid goalId);
        Task<GeneralResponseDto> UpdateGoalProgressAsync(Guid goalId, decimal contributionAmount);
    }
}
