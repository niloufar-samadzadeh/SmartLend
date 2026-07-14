using Microsoft.EntityFrameworkCore;
using SmartLend.Api.DTOs;
using SmartLend.Core.Entities;
using SmartLend.Infrastructure.Data;

namespace SmartLend.Api.Services;

public class AuthService
{
    private readonly SmartLendDbContext _dbContext;

    public AuthService(SmartLendDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User?> RegisterAsync(RegisterRequest request)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var emailExists = await _dbContext.Users
            .AnyAsync(user => user.Email == normalizedEmail);

        if (emailExists)
        {
            return null;
        }

        var user = new User
        {
            FullName = request.FullName.Trim(),
            Email = normalizedEmail,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return user;
    }
}