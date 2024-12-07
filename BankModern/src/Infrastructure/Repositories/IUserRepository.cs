using BankModern.src.Domain.Entities;

namespace BankModern.src.Infrastructure.Repositories
{
    public interface IUserRepository
    {
        // User Management
        Task<ApplicationUser> GetByIdAsync(Guid userId);
        Task<ApplicationUser> GetByEmailAsync(string email);
        Task<bool> CreateAsync(ApplicationUser user, string password);
        Task<bool> UpdateAsync(ApplicationUser user);
        Task<bool> DeleteAsync(Guid userId);

        // Authentication
        Task<ApplicationUser> ValidateUserAsync(string email, string password);
        Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword);

        // Role Operations
        Task<UserRole> GetUserRoleAsync(Guid userId);
        Task<bool> AssignRoleAsync(Guid userId, Guid roleId);

        // Queries
        Task<IEnumerable<ApplicationUser>> GetAllAsync();
        Task<bool> EmailExistsAsync(string email);
        Task<bool> UsernameExistsAsync(string username);
    }
}
