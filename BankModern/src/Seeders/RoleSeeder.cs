using BankModern.src.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace BankModern.src.Seeders
{
    public static class RoleSeeder
    {
        public static async Task SeedRolesAsync(IServiceProvider serviceProvider)
        {
            // Get RoleManager UserManager from DI container
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();


            // Define roles
            string[] roles = { "Admin", "User" };

            foreach (var role in roles)
            {
                // Check if the role exists, create it if it doesn't
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
            // Seed default admin user
            string adminEmail = "admin@yourapp.com";
            string adminPassword = "Admin@123"; // Change this to a secure password

            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                var newAdmin = new ApplicationUser
                {
                    UserName = "admin",
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var createAdminResult = await userManager.CreateAsync(newAdmin, adminPassword);

                if (createAdminResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(newAdmin, "Admin");
                }
            }
        }
    }
}
