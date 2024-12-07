using BankModern.src.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace BankModern.src.Infrastructure.Data
{
    public class BankingDbContext : IdentityDbContext<ApplicationUser, UserRole, Guid>
    {
        public BankingDbContext(DbContextOptions<BankingDbContext> options) : base(options)
        {
            
        }
        public DbSet<ApplicationUser> Users {  get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<CheckingAccount> CheckingAccounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<SavingGoals> SavingGoals { get; set; }
        public DbSet<TransactionsHistory> TransactionsHistory { get; set; }
        public DbSet<InvestmentAccount> Investments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<CheckingAccount>()
                .HasOne(a => a.SavingsGoal)
                .WithOne(c => c.CheckingAccount)
                .HasForeignKey<SavingGoals>(a => a.CheckingAccountId);

            builder.Entity<CheckingAccount>()
                .HasOne(a => a.Investment)
                .WithOne(c => c.CheckingAccount)
                .HasForeignKey<InvestmentAccount>(a => a.CheckingAccountId);

            builder.Entity<TransactionsHistory>()
                .HasMany(th => th.Transactions)
                .WithOne(a => a.TransactionHistory)
                .HasForeignKey(a => a.TransactionHistoryId);

            builder.Entity<ApplicationUser>()
                .HasMany(u => u.CheckingAccounts)
                .WithOne(c => c.User)
                .OnDelete(DeleteBehavior.Restrict); //user can't have many accounts

            builder.Entity<CheckingAccount>()
                .HasMany(c => c.Transactions)
                .WithOne(t => t.SourceAccount)
                .HasForeignKey(t => t.SourceAccountId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CheckingAccount>()
                .Property(c => c.Balance)
                .HasPrecision(18, 4);

            builder.Entity<InvestmentAccount>()
                .Property(i => i.InvestmentAmount)
                .HasPrecision(18, 4);

            builder.Entity<SavingGoals>(entity =>
            {
                entity.Property(s => s.CurrentAmount).HasPrecision(18, 4);
                entity.Property(s => s.TargetAmount).HasPrecision(18, 4);
            });

            builder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasPrecision(18, 4);

            //builder.Entity<Transaction>()
            //.Property(t => t.Type)
            //.HasConversion<string>(); // Store enum as string in the database

        }
    }
}
