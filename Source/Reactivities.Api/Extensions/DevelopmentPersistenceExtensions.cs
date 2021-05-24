namespace Reactivities.Api.Extensions
{
    using System;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Persistence;
    using Persistence.Infrastructure;
    using Persistence.Infrastructure.Interfaces;

    public static class DevelopmentPersistenceExtensions
    {
        private const string ConnectionStringName = "Development";

        public static IServiceCollection AddDevelopmentPersistence(this IServiceCollection collection) =>
            collection
                .AddDbContext<DataContext>(UseOptions)
                .AddTransient<IDataCreator, FakeDataCreator>()
                .AddScoped<IMigrationService, MigrationService>()
                .AddHostedService<MigrationHostedService>();

        private static void UseOptions(IServiceProvider provider, DbContextOptionsBuilder builder)
        {
            var environment = provider.GetRequiredService<IHostEnvironment>();
            if (!environment.IsDevelopment())
                throw new InvalidOperationException("It isn't development environment");
            var configuration = provider.GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString(ConnectionStringName);
            builder
                .UseSqlite(connectionString)
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging();
        }
    }
}