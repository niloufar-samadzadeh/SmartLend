using Microsoft.AspNetCore.Mvc;
using SmartLend.Api.DTOs;
using SmartLend.Core.Entities;
using SmartLend.Infrastructure.Data;

namespace SmartLend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoanApplicationsController : ControllerBase
{
    private readonly SmartLendDbContext _dbContext;

    public LoanApplicationsController(SmartLendDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<ActionResult<LoanApplication>> Create(
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

        return CreatedAtAction(
            nameof(GetById),
            new { id = loanApplication.Id },
            loanApplication);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<LoanApplication>> GetById(int id)
    {
        var loanApplication =
            await _dbContext.LoanApplications.FindAsync(id);

        if (loanApplication is null)
        {
            return NotFound();
        }

        return Ok(loanApplication);
    }
}