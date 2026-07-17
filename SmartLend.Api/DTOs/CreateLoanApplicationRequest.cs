using System.ComponentModel.DataAnnotations;

namespace SmartLend.Api.DTOs;

public class CreateLoanApplicationRequest
{
    [Range(1, double.MaxValue)]
    public decimal MonthlyIncome { get; set; }

    [Required]
    public string EmploymentStatus { get; set; } = string.Empty;

    [Range(0, int.MaxValue)]
    public int EmploymentYears { get; set; }

    [Range(1, double.MaxValue)]
    public decimal LoanAmount { get; set; }

    [Required]
    public string LoanPurpose { get; set; } = string.Empty;

    [Range(0, double.MaxValue)]
    public decimal ExistingDebt { get; set; }

    [Range(0, int.MaxValue)]
    public int CreditHistoryMonths { get; set; }
}