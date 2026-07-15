using System.ComponentModel.DataAnnotations;
using SmartLend.Core.Enums;

namespace SmartLend.Api.DTOs;

public class LoanDecisionRequest
{
    [Required]
    public LoanStatus Status { get; set; }
}