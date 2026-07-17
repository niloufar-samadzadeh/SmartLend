namespace SmartLend.Api.DTOs;

public class LoanApplicationResponse
{
    public int Id { get; set; }

    public decimal MonthlyIncome { get; set; }

    public decimal LoanAmount { get; set; }

    public string Status { get; set; } = string.Empty;

    public decimal? RiskScore { get; set; }

    public DateTime SubmittedAt { get; set; }
}