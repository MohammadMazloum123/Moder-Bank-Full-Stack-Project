namespace BankModern.src.Application.DTOs
{
    public class InvestmentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public Guid CheckingAccountId { get; set; }
    }
}
