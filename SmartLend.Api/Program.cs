using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using SmartLend.Api.Clients;
using SmartLend.Api.Services;
using SmartLend.Infrastructure.Data;
using Npgsql;
using Microsoft.AspNetCore.Mvc;
using SmartLend.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Where(entry => entry.Value?.Errors.Count > 0)
                .ToDictionary(
                    entry => entry.Key,
                    entry => entry.Value!.Errors
                        .Select(error =>
                            string.IsNullOrWhiteSpace(error.ErrorMessage)
                                ? "The supplied value is invalid."
                                : error.ErrorMessage)
                        .ToArray());

            var response = new
            {
                message = "Validation failed.",
                errors
            };

            return new BadRequestObjectResult(response);
        };
    });
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Enter your JWT token"
    });

    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = []
    });
});

var riskScoringUrl = builder.Configuration["Services:RiskScoringUrl"]
    ?? throw new InvalidOperationException(
        "Risk scoring service URL is missing.");

builder.Services.AddHttpClient<RiskScoringClient>(client =>
{
    client.BaseAddress = new Uri(riskScoringUrl);
});

var rawConnectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException(
        "Database connection string is missing.");

string connectionString;

if (rawConnectionString.StartsWith("postgres://",
        StringComparison.OrdinalIgnoreCase) ||
    rawConnectionString.StartsWith("postgresql://",
        StringComparison.OrdinalIgnoreCase))
{
    var databaseUri = new Uri(rawConnectionString);

    var userInfo = databaseUri.UserInfo.Split(':', 2);

    if (userInfo.Length != 2)
    {
        throw new InvalidOperationException(
            "PostgreSQL connection URL is invalid.");
    }

    var connectionStringBuilder =
        new NpgsqlConnectionStringBuilder
        {
            Host = databaseUri.Host,
            Port = databaseUri.Port,
            Database = databaseUri.AbsolutePath.Trim('/'),
            Username = Uri.UnescapeDataString(userInfo[0]),
            Password = Uri.UnescapeDataString(userInfo[1]),
            SslMode = SslMode.Disable
        };

    connectionString = connectionStringBuilder.ConnectionString;
}
else
{
    connectionString = rawConnectionString;
}

builder.Services.AddDbContext<SmartLendDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<LoanApplicationService>();

var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT key is missing.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtKey))
            };
    });

builder.Services.AddAuthorization();

var allowedOrigins =
    builder.Configuration
        .GetSection("Cors:AllowedOrigins")
        .Get<string[]>()
    ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider
        .GetRequiredService<SmartLendDbContext>();

    await dbContext.Database.MigrateAsync();
}

app.UseMiddleware<GlobalExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();