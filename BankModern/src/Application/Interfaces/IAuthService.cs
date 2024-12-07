using BankModern.src.Application.DTOs;
using BankModern.src.Domain.Entities;

namespace BankModern.src.Application.Interfaces
{
    public interface IAuthService
    {
        // Authentication
        Task<GeneralResponseDto> RegisterAsync(ApplicationUserDto registerDto);
        Task<AuthResponseDto> LoginAsync(LogInDto loginDto);
        Task<GeneralResponseDto> LogoutAsync(Guid userId);

        // Token Management
        Task<string> GenerateJwtTokenAsync(ApplicationUser user);

        // Password Management
        Task<GeneralResponseDto> ChangePasswordAsync(ChangePasswordDto changePasswordDto);
        Task<GeneralResponseDto> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);

        // Role Management
        Task<GeneralResponseDto> AssignRoleAsync(Guid userId, string role);
        Task<GeneralResponseDto> RemoveRoleAsync(Guid userId, string role);
        Task<IList<string>> GetUserRolesAsync(Guid userId);
        Task<bool> IsInRoleAsync(Guid userId, string role);

        // Admin Operations
        Task<IEnumerable<ApplicationUserDto>> GetAllUsersAsync();
        Task<GeneralResponseDto> DeactivateUserAsync(Guid userId);
        Task<GeneralResponseDto> ReactivateUserAsync(Guid userId);
    }
}
