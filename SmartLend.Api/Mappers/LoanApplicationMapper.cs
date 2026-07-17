using SmartLend.Api.DTOs;
using SmartLend.Core.Entities;

namespace SmartLend.Api.Mappers;

public static class LoanApplicationMapper
{
    public static LoanApplicationResponse ToResponse(
        this LoanApplication application)
    {
        return new LoanApplicationResponse
        {
            Id = application.Id,
            MonthlyIncome = application.MonthlyIncome,
            LoanAmount = application.LoanAmount,
            Status = application.Status.ToString(),
            RiskScore = application.RiskScore,
            SubmittedAt = application.SubmittedAt
        };
    }
}