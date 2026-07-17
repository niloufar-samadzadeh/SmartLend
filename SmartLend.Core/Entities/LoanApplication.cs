namespace SmartLend.Core.Entities;
using SmartLend.Core.Enums;

public class LoanApplication
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public decimal MonthlyIncome { get; set; }

    public string EmploymentStatus { get; set; } = string.Empty;

    public int EmploymentYears { get; set; }

    public decimal LoanAmount { get; set; }

    public string LoanPurpose { get; set; } = string.Empty;

    public decimal ExistingDebt { get; set; }

    public int CreditHistoryMonths { get; set; }

    public LoanStatus Status { get; set; } = LoanStatus.Pending;

    public decimal? RiskScore { get; set; }

    public DateTime? ReviewedAt { get; set; }

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}