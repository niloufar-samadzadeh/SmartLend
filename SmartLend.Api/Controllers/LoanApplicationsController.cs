using Microsoft.AspNetCore.Mvc;
using SmartLend.Api.DTOs;
using SmartLend.Core.Entities;
using SmartLend.Api.Services;

namespace SmartLend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoanApplicationsController : ControllerBase
{
    private readonly LoanApplicationService _loanApplicationService;

    public LoanApplicationsController(
        LoanApplicationService loanApplicationService)
    {
        _loanApplicationService = loanApplicationService;
    }

    [HttpPost]
    public async Task<ActionResult<LoanApplication>> Create(
    CreateLoanApplicationRequest request)
    {
        var loanApplication =
            await _loanApplicationService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = loanApplication.Id },
            loanApplication);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<LoanApplication>> GetById(int id)
    {
        var loanApplication =
            await _loanApplicationService.GetByIdAsync(id);

        if (loanApplication is null)
        {
            return NotFound();
        }

        return Ok(loanApplication);
    }
}