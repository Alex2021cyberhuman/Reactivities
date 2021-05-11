namespace Reactivities.Persistence.Infrastructure
{
    using System;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.EntityFrameworkCore;

    internal sealed class MigrationService : IMigrationService
    {
        private readonly DataContext _context;
        private readonly IDataCreator _data;

        public MigrationService(DataContext context, IDataCreator data)
        {
            _context = context;
            _data = data;
        }

        public async Task MigrateAsync()
        {
            var isCreated = await _context.Database.CanConnectAsync();
            await _context.Database.MigrateAsync();
            if (isCreated)
                return;
            await _context.Activities.AddRangeAsync(_data.Activities);
            await _context.SaveChangesAsync();
        }

        /// <summary>Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources asynchronously.</summary>
        /// <returns>A task that represents the asynchronous dispose operation.</returns>
        public async ValueTask DisposeAsync() => await _context.DisposeAsync();

        public void Dispose() => _context?.Dispose();
    }
}