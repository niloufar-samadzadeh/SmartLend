using Microsoft.AspNetCore.Mvc;
using SmartLend.Api.DTOs;
using SmartLend.Core.Entities;
using SmartLend.Api.Services;
using Microsoft.AspNetCore.Authorization;
using SmartLend.Core.Enums;
using System.Security.Claims;
using SmartLend.Api.Mappers;

namespace SmartLend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
//[Authorize]
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
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                message = "The authenticated user could not be identified."
            });
        }

        var loanApplication =
            await _loanApplicationService.CreateAsync(request, userId);

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

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<LoanApplication>>> GetAll(
    [FromQuery] LoanStatus? status)
    {
        var applications =
            await _loanApplicationService.GetAllAsync(status);

        return Ok(
            applications
                .Select(application => application.ToResponse())
        );
    }
    [HttpPatch("{id:int}/decision")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<LoanApplication>> UpdateDecision(
    int id,
    LoanDecisionRequest request)
    {
        if (request.Status is not LoanStatus.Approved
            and not LoanStatus.Rejected)
        {
            return BadRequest(new
            {
                message = "Status must be Approved or Rejected."
            });
        }

        var application =
            await _loanApplicationService.UpdateDecisionAsync(
                id,
                request.Status);

        if (application is null)
        {
            return NotFound();
        }

        return Ok(application);
    }
    [HttpGet("mine")]
    public async Task<ActionResult<List<LoanApplicationResponse>>> GetMine()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                message = "The authenticated user could not be identified."
            });
        }

        var applications =
            await _loanApplicationService.GetMineAsync(userId);

        return Ok(
            applications
                .Select(application => application.ToResponse())
        );
    }
}