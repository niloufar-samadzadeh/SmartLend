using System.ComponentModel.DataAnnotations;

namespace SmartLend.Api.DTOs;

public class CreateLoanApplicationRequest
{
    [Range(
        1,
        double.MaxValue,
        ErrorMessage = "Monthly income must be greater than zero.")]
    public decimal MonthlyIncome { get; set; }

    [Required(ErrorMessage = "Employment status is required.")]
    [StringLength(
        100,
        ErrorMessage = "Employment status cannot exceed 100 characters.")]
    public string EmploymentStatus { get; set; } = string.Empty;

    [Range(
        0,
        80,
        ErrorMessage = "Employment years must be between 0 and 80.")]
    public int EmploymentYears { get; set; }

    [Range(
        1,
        double.MaxValue,
        ErrorMessage = "Loan amount must be greater than zero.")]
    public decimal LoanAmount { get; set; }

    [Required(ErrorMessage = "Loan purpose is required.")]
    [StringLength(
        250,
        ErrorMessage = "Loan purpose cannot exceed 250 characters.")]
    public string LoanPurpose { get; set; } = string.Empty;

    [Range(
        0,
        double.MaxValue,
        ErrorMessage = "Existing debt cannot be negative.")]
    public decimal ExistingDebt { get; set; }

    [Range(
        0,
        1200,
        ErrorMessage = "Credit history must be between 0 and 1200 months.")]
    public int CreditHistoryMonths { get; set; }
}