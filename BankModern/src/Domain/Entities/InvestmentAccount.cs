using System.ComponentModel.DataAnnotations.Schema;

namespace BankModern.src.Domain.Entities
{
    public class InvestmentAccount
    {
        public Guid Id { get; set; } // Primary Key
        public string InvestmentType { get; set; }
        public decimal InvestmentAmount { get; set; }

        // Navigation Properties
        public Guid CheckingAccountId { get; set; }

        [ForeignKey("CheckingAccountId")]
        public CheckingAccount CheckingAccount { get; set; } // One-to-One with CheckingAccount
    }
}
