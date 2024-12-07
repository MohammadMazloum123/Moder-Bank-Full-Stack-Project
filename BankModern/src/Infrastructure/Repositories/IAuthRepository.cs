using BankModern.src.Application.DTOs;
using BankModern.src.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankModern.src.Infrastructure.Repositories
{
    public interface IAuthRepository
    {
        // User Management
        Task<ApplicationUser> FindByIdAsync(string userId);
        Task<ApplicationUser> FindByEmailAsync(string email);
        Task<IdentityResult> CreateAsync(ApplicationUser user, string password);
        Task<IdentityResult> UpdateAsync(ApplicationUser user);
        Task<IList<string>> GetRolesAsync(ApplicationUser user);
        Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role);
        Task<IdentityResult> RemoveFromRoleAsync(ApplicationUser user, string role);
        Task<bool> IsInRoleAsync(ApplicationUser user, string role);
        Task<SignInResult> PasswordSignInAsync(ApplicationUser user, string password, bool isPersistent, bool lockoutOnFailure);
        Task SignOutAsync();

        // Role Management
        Task<bool> RoleExistsAsync(string roleName);
        Task<IdentityResult> CreateRoleAsync(IdentityRole role);

        // Password Handling
        Task<IdentityResult> ChangePasswordAsync(ApplicationUser user, string currentPassword, string newPassword);
        Task<IdentityResult> ResetPasswordAsync(ApplicationUser user, string token, string newPassword);

        // Queries
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();

        // Additional methods
        Task<string> GeneratePasswordResetTokenAsync(ApplicationUser user);
    }
}