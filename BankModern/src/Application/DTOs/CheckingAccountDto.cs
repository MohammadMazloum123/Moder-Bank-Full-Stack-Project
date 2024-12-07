namespace BankModern.src.Application.DTOs
{
    public class CheckingAccountDto
    {
        public Guid AccountId { get; set; } // Unique account ID
        public string AccountName { get; set; } // Name of the account
        public string AccountType { get; set; } // Type of the account (Checking, Savings, Investment)
        public decimal Balance { get; set; } // Current balance in the account
    }
}
