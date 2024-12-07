namespace BankModern.src.Application.DTOs
{
    public class SavingsGoalDto
    {
        public Guid Id { get; set; }
        public string GoalName { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public Guid CheckingAccountId { get; set; }
    }
}

