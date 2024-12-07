namespace BankModern.src.Application.DTOs
{
    public class TransactionsHistoryDto
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public decimal TotalDeposits { get; set; }
        public decimal TotalWithdrawals { get; set; }
        public decimal TotalTransfers { get; set; }
        public decimal TotalContributions { get; set; }
        public List<TransactionDto> Transactions { get; set; }
    }
}
