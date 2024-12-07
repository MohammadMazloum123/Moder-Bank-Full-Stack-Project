using BankModern.src.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankModern.src.Domain.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; } // Primary Key
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public TransactionType Type { get; set; } // e.g., Deposit, Withdraw, Transfer, Contribution

        // Navigation Properties
        public Guid SourceAccountId { get; set; }

        [ForeignKey("SourceAccountId")]
        public CheckingAccount SourceAccount { get; set; } // Many-to-One with CheckingAccount

        public Guid? DestinationAccountId { get; set; } // Nullable for non-transfer transactions

        [ForeignKey("DestinationAccountId")]
        public SavingGoals DestinationAccount { get; set; } // Many-to-One with Saving Goals

        // Foreign key for TransactionHistory
        public Guid TransactionHistoryId { get; set; }
        [ForeignKey("TransactionHistoryId")]
        public TransactionsHistory TransactionHistory { get; set; } // One-to-One with TransactionHistory
    }
}
