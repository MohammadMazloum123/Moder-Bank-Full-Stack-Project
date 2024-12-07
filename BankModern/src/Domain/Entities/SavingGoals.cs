using System.ComponentModel.DataAnnotations.Schema;

namespace BankModern.src.Domain.Entities
{
    public class SavingGoals
    {
        public Guid Id { get; set; } // Primary Key
        public string GoalName { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }

        // Navigation Properties
        public Guid CheckingAccountId { get; set; }
        [ForeignKey("CheckingAccountId")]
        public CheckingAccount CheckingAccount { get; set; } // One-to-One with CheckingAccount
    }
}
