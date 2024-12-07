using BankModern.src.Domain.Entities;
using BankModern.src.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BankModern.src.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BankingDbContext _context;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(BankingDbContext context, ILogger<UserRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<ApplicationUser> GetByIdAsync(Guid userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task<ApplicationUser> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<bool> CreateAsync(ApplicationUser user, string password)
        {
            try
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user");
                return false;
            }
        }

        public async Task<bool> UpdateAsync(ApplicationUser user)
        {
            try
            {
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user");
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user != null)
                {
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user");
                return false;
            }
        }

        public async Task<ApplicationUser> ValidateUserAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return user;
            }
            return null;
        }

        public async Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null && BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<UserRole> GetUserRoleAsync(Guid userId)
        {
            var userRole = await _context.UserRoles
                .FirstOrDefaultAsync(ur => ur.Id == userId);
            return userRole;
        }

        public async Task<bool> AssignRoleAsync(Guid userId, Guid roleId)
        {
            try
            {
                var userRole = new UserRole { Id = userId, RoleId = roleId };
                await _context.UserRoles.AddAsync(userRole);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error assigning role to user");
                return false;
            }
        }

        public async Task<IEnumerable<ApplicationUser>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> UsernameExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.UserName == username);
        }
    }
}
