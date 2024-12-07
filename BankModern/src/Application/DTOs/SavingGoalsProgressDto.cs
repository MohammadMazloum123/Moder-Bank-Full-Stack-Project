namespace BankModern.src.Application.DTOs
{
    public class SavingGoalsProgressDto
    {
        public Guid GoalId { get; set; } // Unique ID of the goal
        public string GoalName { get; set; } // Name of the goal
        public decimal TargetAmount { get; set; } // Target amount to reach
        public decimal CurrentAmount { get; set; } // Amount already saved towards the goal
        public decimal RemainingAmount { get; set; } // Remaining amount to reach the target
        public decimal Progress {  get; set; }
        public DateTime TargetDate { get; set; } // Target date to achieve the goal
    }
}
