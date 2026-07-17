using SmartLend.Api.DTOs;
using SmartLend.Core.Entities;
using SmartLend.Infrastructure.Data;
using SmartLend.Api.Clients;
using SmartLend.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace SmartLend.Api.Services;

public class LoanApplicationService
{
    private readonly SmartLendDbContext _dbContext;

    private readonly RiskScoringClient _riskScoringClient;

    public LoanApplicationService(
    SmartLendDbContext dbContext,
    RiskScoringClient riskScoringClient)
    {
        _dbContext = dbContext;
        _riskScoringClient = riskScoringClient;
    }

    public async Task<LoanApplication> CreateAsync(
        CreateLoanApplicationRequest request,
        int userId)
    {
        var riskResult = await _riskScoringClient.PredictAsync(
            new RiskRequest
            {
                MonthlyIncome = request.MonthlyIncome,
                EmploymentYears = request.EmploymentYears,
                LoanAmount = request.LoanAmount,
                ExistingDebt = request.ExistingDebt,
                CreditHistoryMonths = request.CreditHistoryMonths
            });
        var loanApplication = new LoanApplication
        {
            UserId = userId,
            MonthlyIncome = request.MonthlyIncome,
            EmploymentStatus = request.EmploymentStatus,
            EmploymentYears = request.EmploymentYears,
            LoanAmount = request.LoanAmount,
            LoanPurpose = request.LoanPurpose,
            ExistingDebt = request.ExistingDebt,
            CreditHistoryMonths = request.CreditHistoryMonths,
            RiskScore = riskResult?.RiskScore,
            Status = riskResult?.RiskBand switch
            {
                "Low" => LoanStatus.Approved,
                "Medium" => LoanStatus.Pending,
                "High" => LoanStatus.Rejected,
                _ => LoanStatus.Pending
            }
        };

        _dbContext.LoanApplications.Add(loanApplication);
        await _dbContext.SaveChangesAsync();

        return loanApplication;
    }

    public async Task<LoanApplication?> GetByIdAsync(int id)
    {
        return await _dbContext.LoanApplications
            .Include(application => application.User)
            .FirstOrDefaultAsync(application => application.Id == id);
    }
    public async Task<List<LoanApplication>> GetAllAsync(LoanStatus? status)
    {
        var query = _dbContext.LoanApplications
            .Include(application => application.User)
            .AsQueryable();

        if (status.HasValue)
        {
            query = query.Where(application => application.Status == status.Value);
        }

        return await query
            .OrderByDescending(application => application.SubmittedAt)
            .ToListAsync();
    }

    public async Task<LoanApplication?> UpdateDecisionAsync(
        int id,
        LoanStatus status)
    {
        var loanApplication =
            await _dbContext.LoanApplications.FindAsync(id);

        if (loanApplication is null)
        {
            return null;
        }

        loanApplication.Status = status;
        loanApplication.ReviewedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return loanApplication;
    }
    public async Task<List<LoanApplication>> GetMineAsync(int userId)
    {
        return await _dbContext.LoanApplications
            .Where(application => application.UserId == userId)
            .OrderByDescending(application => application.SubmittedAt)
            .ToListAsync();
    }

}