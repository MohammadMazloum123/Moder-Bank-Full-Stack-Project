using System.ComponentModel.DataAnnotations.Schema;

namespace BankModern.src.Domain.Entities
{
    public class CheckingAccount
    {
        public Guid Id { get; set; }
        public decimal Balance { get; set; }

        // Navigation Properties
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } // Many-to-One with User
        public SavingGoals SavingsGoal { get; set; } // One-to-One with SavingsGoal
        public InvestmentAccount Investment { get; set; } // One-to-One with Investment
        public ICollection<Transaction> Transactions { get; set; } // One-to-Many with Transaction
    }
}
