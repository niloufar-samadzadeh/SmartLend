namespace SmartLend.Api.DTOs;

using System.ComponentModel.DataAnnotations;

public class CreateLoanApplicationRequest
{
    public int UserId { get; set; }

    [Range(1, double.MaxValue)]
    public decimal MonthlyIncome { get; set; }

    [Required]
    public string EmploymentStatus { get; set; } = string.Empty;

    public int EmploymentYears { get; set; }

    [Range(1, double.MaxValue)]
    public decimal LoanAmount { get; set; }

    [Required]
    public string LoanPurpose { get; set; } = string.Empty;

    public decimal ExistingDebt { get; set; }

    public int CreditHistoryMonths { get; set; }
}