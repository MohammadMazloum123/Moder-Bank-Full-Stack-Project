using BankModern.src.Domain.Enums;

namespace BankModern.src.Domain.Entities
{
    public class TransactionsHistory
    {
        public Guid Id { get; set; } // Primary Key
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public TransactionType TransactionType { get; set; } // e.g., Deposit, Withdraw, Transfer, Contribution
        // Navigation Properties
        public Guid TransactionId { get; set; }
        public ICollection<Transaction> Transactions { get; set; } // One-to-One with Transaction
    
}
}
