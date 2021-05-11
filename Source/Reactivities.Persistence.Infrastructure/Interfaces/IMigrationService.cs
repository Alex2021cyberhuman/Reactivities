namespace Reactivities.Persistence.Infrastructure.Interfaces
{
    using System;
    using System.Threading.Tasks;

    public interface IMigrationService : IAsyncDisposable, IDisposable
    {
        Task MigrateAsync();
    }
}