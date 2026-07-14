using SmartLend.Api.DTOs;
using SmartLend.Core.Entities;
using SmartLend.Infrastructure.Data;

namespace SmartLend.Api.Services;

public class LoanApplicationService
{
    private readonly SmartLendDbContext _dbContext;

    public LoanApplicationService(SmartLendDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<LoanApplication> CreateAsync(
        CreateLoanApplicationRequest request)
    {
        var loanApplication = new LoanApplication
        {
            UserId = request.UserId,
            MonthlyIncome = request.MonthlyIncome,
            EmploymentStatus = request.EmploymentStatus,
            EmploymentYears = request.EmploymentYears,
            LoanAmount = request.LoanAmount,
            LoanPurpose = request.LoanPurpose,
            ExistingDebt = request.ExistingDebt,
            CreditHistoryMonths = request.CreditHistoryMonths
        };

        _dbContext.LoanApplications.Add(loanApplication);
        await _dbContext.SaveChangesAsync();

        return loanApplication;
    }

    public async Task<LoanApplication?> GetByIdAsync(int id)
    {
        return await _dbContext.LoanApplications.FindAsync(id);
    }
}