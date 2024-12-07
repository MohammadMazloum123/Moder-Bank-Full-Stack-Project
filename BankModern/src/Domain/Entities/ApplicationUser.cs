using Microsoft.AspNetCore.Identity;

namespace BankModern.src.Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ICollection<CheckingAccount> CheckingAccounts { get; set; } // One-to-Many with CheckingAccount
    }
}
