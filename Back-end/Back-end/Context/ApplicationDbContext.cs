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
    public class ApplicationDbContext : DbContext
    {
        protected readonly IConfiguration _configuration;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public ApplicationDbContext() { }

        // DB sets actualizados - CORREGIDO: Cards en lugar de Card
        public DbSet<Cards> Cards { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Round> Rounds { get; set; }
        public DbSet<Turn> Turn { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<PlayerCard> PlayerCards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de Game-Room (1:1)
            modelBuilder.Entity<Game>()
                .HasOne(g => g.Room)
                .WithOne(r => r.Game)
                .HasForeignKey<Game>(g => g.IdRoom)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuración de Player
            modelBuilder.Entity<Player>()
                .HasOne(p => p.Game)
                .WithMany(g => g.Players)
                .HasForeignKey(p => p.IdGame)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuración de PlayerCard (tabla intermedia)
            modelBuilder.Entity<PlayerCard>()
                .HasOne(pc => pc.Player)
                .WithMany(p => p.PlayerCards)
                .HasForeignKey(pc => pc.IdPlayer)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PlayerCard>()
                .HasOne(pc => pc.Card)
                .WithMany(c => c.PlayerCards)
                .HasForeignKey(pc => pc.IdCard)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuración de Round
            modelBuilder.Entity<Round>()
                .HasOne(r => r.Game)
                .WithMany(g => g.Rounds)
                .HasForeignKey(r => r.IdGame)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuración de Turn - CAMBIO IMPORTANTE AQUÍ
            // Usamos NoAction para evitar múltiples rutas de cascada
            modelBuilder.Entity<Turn>()
                .HasOne(t => t.Round)
                .WithMany(r => r.Turn)  // CORREGIDO: Turns en lugar de Turn
                .HasForeignKey(t => t.IdRound)
                .OnDelete(DeleteBehavior.NoAction);  // CAMBIADO A NoAction

            modelBuilder.Entity<Turn>()
                .HasOne(t => t.Player)
                .WithMany(p => p.Turn)  // CORREGIDO: Turns en lugar de Turn
                .HasForeignKey(t => t.IdPlayer)
                .OnDelete(DeleteBehavior.NoAction);  // CAMBIADO A NoAction

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