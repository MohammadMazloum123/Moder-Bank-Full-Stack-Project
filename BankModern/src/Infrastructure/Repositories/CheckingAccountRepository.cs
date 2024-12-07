using BankModern.src.Domain.Entities;
using BankModern.src.Infrastructure.Data;
using BankModern.src.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

public class CheckingAccountRepository : ICheckingAccountRepository
{
    private readonly BankingDbContext _context;
    private readonly ILogger<CheckingAccountRepository> _logger;

    public CheckingAccountRepository(BankingDbContext context, ILogger<CheckingAccountRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<CheckingAccount> GetByUserIdAsync(Guid userId)
    {
        try
        {
            return await _context.CheckingAccounts
                .FirstOrDefaultAsync(ca => ca.UserId == userId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving checking account for user {UserId}", userId);
            throw;
        }
    }

    public async Task<CheckingAccount> GetByAccountIdAsync(Guid accountId)
    {
        try
        {
            return await _context.CheckingAccounts
                .FindAsync(accountId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving checking account {AccountId}", accountId);
            throw;
        }
    }

    public async Task<bool> CreateAsync(CheckingAccount account)
    {
        try
        {
            await _context.CheckingAccounts.AddAsync(account);
            int affectedRows = await _context.SaveChangesAsync();
            return affectedRows > 0;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating checking account for user {UserId}", account.UserId);
            return false;
        }
    }

    public async Task<bool> UpdateAsync(CheckingAccount account)
    {
        try
        {
            _context.CheckingAccounts.Update(account);
            int affectedRows = await _context.SaveChangesAsync();
            return affectedRows > 0;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating checking account {AccountId}", account.Id);
            return false;
        }
    }

    public async Task<decimal> GetBalanceAsync(Guid userId)
    {
        try
        {
            var account = await _context.CheckingAccounts
                .FirstOrDefaultAsync(ca => ca.UserId == userId);
            return account?.Balance ?? 0;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving balance for user {UserId}", userId);
            throw;
        }
    }

    public async Task<bool> UpdateBalanceAsync(Guid userId, decimal newBalance)
    {
        try
        {
            var account = await _context.CheckingAccounts
                .FirstOrDefaultAsync(ca => ca.UserId == userId);

            if (account == null)
            {
                _logger.LogWarning("Checking account not found for user {UserId}", userId);
                return false;
            }

            account.Balance = newBalance;
            _context.CheckingAccounts.Update(account);
            int affectedRows = await _context.SaveChangesAsync();
            return affectedRows > 0;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating balance for user {UserId}", userId);
            return false;
        }
    }
}
