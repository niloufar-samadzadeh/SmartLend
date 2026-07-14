using Microsoft.AspNetCore.Mvc;
using SmartLend.Api.DTOs;
using SmartLend.Api.Services;

namespace SmartLend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var user = await _authService.RegisterAsync(request);

        if (user is null)
        {
            return Conflict(new
            {
                message = "An account with this email already exists."
            });
        }

        return Created(string.Empty, new
        {
            user.Id,
            user.FullName,
            user.Email,
            user.Role,
            user.CreatedAt
        });
    }
}