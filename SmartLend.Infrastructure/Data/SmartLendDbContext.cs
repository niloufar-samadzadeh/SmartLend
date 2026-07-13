using Microsoft.EntityFrameworkCore;
using SmartLend.Core.Entities;

namespace SmartLend.Infrastructure.Data;

public class SmartLendDbContext : DbContext
{
    public SmartLendDbContext(DbContextOptions<SmartLendDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<LoanApplication> LoanApplications => Set<LoanApplication>();
}