using BankModern.src.Application.DTOs;
using BankModern.src.Application.Interfaces;
using BankModern.src.Domain.Entities;
using BankModern.src.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BankModern.src.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }

        // Role Management
        public async Task<GeneralResponseDto> AssignRoleAsync(Guid userId, string role)
        {
            var user = await _authRepository.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "User not found!",
                    StatusCode = 404
                };
            }
            if (!await _authRepository.RoleExistsAsync(role))
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = $"Role '{role}' doesn't exist",
                    StatusCode = 404
                };
            }
            var result = await _authRepository.AddToRoleAsync(user, role);
            if (result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    Success = true,
                    Message = $"Role '{role}' assigned to '{user.UserName}' done!",
                    StatusCode = 200
                };
            };
            return new GeneralResponseDto
            {
                Success = false,
                Message = string.Join("; ", result.Errors.Select(e => e.Description)),
                StatusCode = 401
            };
        }

        public async Task<IList<string>> GetUserRolesAsync(Guid userId)
        {
            var user = await _authRepository.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                throw new KeyNotFoundException("User not found!");
            }
            return await _authRepository.GetRolesAsync(user);
        }

        public async Task<bool> IsInRoleAsync(Guid userId, string role)
        {
            var user = await _authRepository.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }

            return await _authRepository.IsInRoleAsync(user, role);
        }

        public async Task<GeneralResponseDto> RemoveRoleAsync(Guid userId, string role)
        {
            var user = await _authRepository.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "User not found!",
                    StatusCode = 404
                };
            }

            if (!await _authRepository.IsInRoleAsync(user, role))
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = $"User is not in the '{role}' role.",
                    StatusCode = 400
                };
            }

            var result = await _authRepository.RemoveFromRoleAsync(user, role);

            if (result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    Success = true,
                    Message = $"Role '{role}' removed successfully from user.",
                    StatusCode = 200
                };
            }

            var errorMessages = string.Join("; ", result.Errors.Select(e => e.Description));
            return new GeneralResponseDto
            {
                Success = false,
                Message = $"Error occurred while removing role: {errorMessages}",
                StatusCode = 400
            };
        }

        // Password Handling
        public async Task<GeneralResponseDto> ChangePasswordAsync(ChangePasswordDto changePasswordDto)
        {
            var user = await _authRepository.FindByIdAsync(changePasswordDto.UserId.ToString());
            if (user == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "User not found!",
                    StatusCode = 404
                };
            }

            var result = await _authRepository.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);

            if (result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    Success = true,
                    Message = "Password changed successfully!",
                    StatusCode = 200
                };
            }
            else
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Failed to change password.",
                    StatusCode = 400
                };
            }
        }

        public async Task<GeneralResponseDto> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            var user = await _authRepository.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "User not found!",
                    StatusCode = 404
                };
            }

            var result = await _authRepository.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.NewPassword);

            if (result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    Success = true,
                    Message = "Password reset successfully!",
                    StatusCode = 200
                };
            }
            else
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Failed to reset password.",
                    StatusCode = 400
                };
            }
        }

        // JWT Tokens
        public async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
        {
            var roles = await _authRepository.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Authentication
        public async Task<GeneralResponseDto> RegisterAsync(ApplicationUserDto registerDto)
        {
            var existingUser = await _authRepository.FindByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Email already exists.",
                    StatusCode = 400
                };
            }

            var newUser = new ApplicationUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var result = await _authRepository.CreateAsync(newUser, registerDto.Password);
            if (!result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "Error occurred while registering the user.",
                    StatusCode = 400
                };
            }

            await _authRepository.AddToRoleAsync(newUser, "User");

            return new GeneralResponseDto
            {
                Success = true,
                Message = "Registration successful.",
                StatusCode = 201
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LogInDto loginDto)
        {
            var user = await _authRepository.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Invalid login attempt.",
                    StatusCode = 400
                };
            }

            var signInResult = await _authRepository.PasswordSignInAsync(user, loginDto.Password, false, false);

            if (signInResult.Succeeded)
            {
                var token = await GenerateJwtTokenAsync(user);

                return new AuthResponseDto
                {
                    Success = true,
                    Message = "Login successful.",
                    Token = token,
                    StatusCode = 200
                };
            }
            else
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Invalid login attempt.",
                    StatusCode = 400
                };
            }
        }

        public async Task<GeneralResponseDto> LogoutAsync(Guid userId)
        {
            await _authRepository.SignOutAsync();

            return new GeneralResponseDto
            {
                Success = true,
                Message = "Logout successful.",
                StatusCode = 200
            };
        }

        // Admin Operations
        public async Task<GeneralResponseDto> ReactivateUserAsync(Guid userId)
        {
            var user = await _authRepository.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "User not found.",
                    StatusCode = 404
                };
            }

            //user.IsActive = true;
            var result = await _authRepository.UpdateAsync(user);

            if (result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    Success = true,
                    Message = "User reactivated successfully.",
                    StatusCode = 200
                };
            }

            return new GeneralResponseDto
            {
                Success = false,
                Message = "Failed to reactivate user.",
                StatusCode = 400
            };
        }

        public async Task<GeneralResponseDto> DeactivateUserAsync(Guid userId)
        {
            var user = await _authRepository.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return new GeneralResponseDto
                {
                    Success = false,
                    Message = "User not found.",
                    StatusCode = 404
                };
            }

            //user.IsActive = false;
            var result = await _authRepository.UpdateAsync(user);

            if (result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    Success = true,
                    Message = "User deactivated successfully.",
                    StatusCode = 200
                };
            }

            return new GeneralResponseDto
            {
                Success = false,
                Message = "Failed to deactivate user.",
                StatusCode = 400
            };
        }

        public async Task<IEnumerable<ApplicationUserDto>> GetAllUsersAsync()
        {
            var users = await _authRepository.GetAllUsersAsync();
            return users.Select(u => new ApplicationUserDto
            {
                Id = u.Id,
                Username = u.UserName,
                Email = u.Email,
                //IsActive = u.IsActive
                // Map other properties as needed
            });
        }
    }
}