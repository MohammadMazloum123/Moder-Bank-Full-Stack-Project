using BankModern.src.Domain.Enums;

namespace BankModern.src.Application.DTOs
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public Guid SourceAccountId { get; set; }
        public Guid? DestinationAccountId { get; set; } // Nullable for non-transfer types
        public decimal Amount { get; set; }
        public TransactionType TransactionType { get; set; } // Deposit, Withdrawal, Transfer, Contribution
        public DateTime TransactionDate { get; set; }
    }
}
