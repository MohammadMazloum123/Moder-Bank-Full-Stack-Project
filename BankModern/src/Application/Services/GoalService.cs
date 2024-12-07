using BankModern.src.Application.DTOs;
using BankModern.src.Application.Interfaces;
using BankModern.src.Domain.Entities;
using BankModern.src.Domain.Enums;
using BankModern.src.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BankModern.src.Application.Services
{
    public class GoalService : IGoalService
    {
        private readonly BankingDbContext _context;
        public GoalService(BankingDbContext context)
        {
            _context = context;
        }
        public async Task<GeneralResponseDto> CreateSavingsGoalAsync(SavingsGoalDto createGoalDto)
        {
            var savingGoals = new SavingGoals
            {
                Id = Guid.NewGuid(),
                GoalName = createGoalDto.GoalName,
                TargetAmount = createGoalDto.TargetAmount,
                CurrentAmount = 0,
                CheckingAccountId = createGoalDto.CheckingAccountId,
            };
            await _context.SavingGoals.AddAsync(savingGoals);
            await _context.SaveChangesAsync();

            return new GeneralResponseDto
            {
                Success = true,
                Message = "Savings goal created successfully",
                StatusCode = 201
            };
        }

        public async Task<SavingGoalsProgressDto> GetSavingsGoalProgressAsync(Guid goalId)
        {
            var goal = await _context.SavingGoals
                .FirstOrDefaultAsync(x => x.Id == goalId);

            if (goal == null) return null;

            var progress = new SavingGoalsProgressDto
            {
                GoalId = goalId,
                GoalName = goal.GoalName,
                TargetAmount = goal.TargetAmount,
                CurrentAmount = goal.CurrentAmount,
                RemainingAmount = (goal.TargetAmount - goal.CurrentAmount),
                Progress = (goal.CurrentAmount / goal.TargetAmount) * 100
            };
            return progress;
        }

        public async Task<IEnumerable<SavingsGoalDto>> GetUserSavingsGoalsAsync(Guid userId)
        {
            var goals = await _context.SavingGoals
                .Where(g => g.Id == userId)
                .Select(g => new SavingsGoalDto
                {
                    Id = g.Id,
                    GoalName = g.GoalName,
                    TargetAmount = g.TargetAmount,
                    CurrentAmount = g.CurrentAmount,
                    CheckingAccountId = g.CheckingAccountId,
                })
                .ToListAsync();
            return goals;
        }

        public async Task<GeneralResponseDto> UpdateGoalProgressAsync(Guid goalId, decimal contributionAmount)
        {
            // Retrieve the goal
            var goal = await _context.SavingGoals
                .FirstOrDefaultAsync(g => g.Id == goalId);

            if (goal == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Goal not found!",
                    StatusCode = 404
                };
            }

            // Check if contributionAmount is positive
            if (contributionAmount <= 0)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Contribution amount must be positive.",
                    StatusCode = 400
                };
            }

            // Retrieve the checking account for the user
            var checkingAccount = await _context.CheckingAccounts
                .FirstOrDefaultAsync(c => c.Id == goal.CheckingAccountId);

            if (checkingAccount == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Checking account not found!",
                    StatusCode = 404
                };
            }

            // Check if the checking account has enough balance
            if (checkingAccount.Balance < contributionAmount)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Insufficient funds in checking account.",
                    StatusCode = 400
                };
            }

            // Deduct from the checking account balance
            checkingAccount.Balance -= contributionAmount;

            // Add the contribution as a transaction
            var transaction = new Transaction
            {
                TransactionDate = DateTime.UtcNow,
                Amount = contributionAmount,
                TransactionType = "Contribution", // Mark as Contribution
                SourceAccountId = checkingAccount.Id,
                DestinationAccountId = goal.CheckingAccountId, // Assuming the savings goal is linked to a Checking Account
                TransactionHistoryId = Guid.NewGuid() // Assuming transaction history is generated for each transaction
            };


            // Add transaction history and transaction to the database
            await _context.Transactions.AddAsync(transaction);

            // Update the goal progress
            goal.CurrentAmount += contributionAmount;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return new GeneralResponseDto
            {
                Success = true,
                Message = "Goal progress updated successfully!",
                StatusCode = 200
            };
        }
    }
}