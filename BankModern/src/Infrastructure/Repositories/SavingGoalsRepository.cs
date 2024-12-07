using BankModern.src.Domain.Entities;
using BankModern.src.Infrastructure.Data;
using BankModern.src.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class SavingGoalsRepository : ISavingGoalsRepository
{
    private readonly BankingDbContext _context;
    private readonly ILogger<SavingGoalsRepository> _logger;

    public SavingGoalsRepository(BankingDbContext context, ILogger<SavingGoalsRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<SavingGoals> GetByIdAsync(Guid accountId)
    {
        return await _context.SavingGoals.FindAsync(accountId);
    }

    public async Task<IEnumerable<SavingGoals>> GetByUserIdAsync(Guid userId)
    {
        return await _context.SavingGoals
            .Where(sg => sg.Id == userId)
            .ToListAsync();
    }

    public async Task<decimal> GetBalanceAsync(Guid accountId)
    {
        var savingGoal = await _context.SavingGoals.FindAsync(accountId);
        return savingGoal?.CurrentAmount ?? 0;
    }

    public async Task AddAsync(SavingGoals savingsAccount)
    {
        try
        {
            await _context.SavingGoals.AddAsync(savingsAccount);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding saving goal");
            throw;
        }
    }

    public async Task DeleteAsync(Guid accountId)
    {
        try
        {
            var savingGoal = await _context.SavingGoals.FindAsync(accountId);
            if (savingGoal != null)
            {
                _context.SavingGoals.Remove(savingGoal);
                await _context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting saving goal");
            throw;
        }
    }
}
