using Back_end.Model;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Context
{
    //representa el contexto de la base de datos 
    public class ApplicationDbContext : DbContext
    {
        protected readonly IConfiguration _configuration;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public ApplicationDbContext() { }

        //DB sets
        public DbSet<Cards> Cards { get; set; }
        public DbSet<Game> Game { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Round> Round { get; set; }
        public DbSet<Turn> Turn { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //Relaciones de uno a mucho
            modelBuilder.Entity<Round>()
                 .HasOne(r => r.Game)
                 .WithMany(g => g.Round)
                 .HasForeignKey(r => r.IdGame);


            modelBuilder.Entity<Round>()
              .HasOne(r => r.Game)
              .WithMany(g => g.Round)
              .HasForeignKey(r => r.IdGame);


            modelBuilder.Entity<Cards>()
             .HasOne(c => c.Game)
             .WithMany(dc => dc.Cards)
             .HasForeignKey(c => c.IdGame);


            //Relaciones de 1 a 1

            modelBuilder.Entity<Game>()
              .HasOne(g => g.Room)
              .WithOne(r => r.Game)
              .HasForeignKey<Game>(g => g.IdRoom);

          

            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }


        void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {

        }
        public override int SaveChanges()
        {
            EnsureAudit();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            EnsureAudit();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

        }

        private void EnsureAudit()
        {
            ChangeTracker.DetectChanges();
        }

        public async Task<IEnumerable<T>> QueryAsync<T>(string text, object? parameters = null, int? timeout = null, CommandType? type = null)
        {
            using var command = new DapperEFCoreCommand(this, text, parameters ?? new { }, timeout, type, CancellationToken.None);
            var connection = this.Database.GetDbConnection();
            return await connection.QueryAsync<T>(command.Definition);
        }

        public async Task<T?> QueryFirstOrDefaultAsync<T>(string text, object? parameters = null, int? timeout = null, CommandType? type = null)
        {
            using var command = new DapperEFCoreCommand(this, text, parameters ?? new { }, timeout, type, CancellationToken.None);
            var connection = this.Database.GetDbConnection();
            return await connection.QueryFirstOrDefaultAsync<T>(command.Definition);
        }



        public readonly struct DapperEFCoreCommand : IDisposable
        {

            public DapperEFCoreCommand(DbContext context, string text, object parameters, int? timeout, CommandType? type, CancellationToken ct)
            {
                var transaction = context.Database.CurrentTransaction?.GetDbTransaction();
                var commandType = type ?? CommandType.Text;
                var commandTimeout = timeout ?? context.Database.GetCommandTimeout() ?? 30;

                Definition = new CommandDefinition(
                    text,
                    parameters,
                    transaction,
                    commandTimeout,
                    commandType,
                    cancellationToken: ct
                );
            }

            public CommandDefinition Definition { get; }

            public void Dispose() { }

        }
    }
}
