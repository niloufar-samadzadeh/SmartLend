namespace SmartLend.Api.DTOs;

public class CreateLoanApplicationRequest
{
    public int UserId { get; set; }

    public decimal MonthlyIncome { get; set; }

    public string EmploymentStatus { get; set; } = string.Empty;

    public int EmploymentYears { get; set; }

    public decimal LoanAmount { get; set; }

    public string LoanPurpose { get; set; } = string.Empty;

    public decimal ExistingDebt { get; set; }

    public int CreditHistoryMonths { get; set; }
}