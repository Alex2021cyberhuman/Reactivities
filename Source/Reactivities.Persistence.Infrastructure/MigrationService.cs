namespace Reactivities.Persistence.Infrastructure
{
    using System;
    using System.Threading.Tasks;
    using Domain;
    using Interfaces;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    public sealed class MigrationService : IMigrationService
    {
        private readonly DataContext _context;
        private readonly IDataCreator _data;
        private readonly UserManager<User> _userManager;

        public MigrationService(DataContext context, IDataCreator data, UserManager<User> userManager)
        {
            _context = context;
            _data = data;
            _userManager = userManager;
        }

        public async Task MigrateAsync()
        {
            var isCreated = await _context.Database.CanConnectAsync();
            await _context.Database.MigrateAsync();
            if (isCreated)
                return;
            await _context.Activities.AddRangeAsync(_data.Activities);
            foreach (var user in _data.Users)
            {
                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded)
                    throw new ApplicationException(result.ToString());
            }
            await _context.SaveChangesAsync();
        }

        /// <summary>Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources asynchronously.</summary>
        /// <returns>A task that represents the asynchronous dispose operation.</returns>
        public async ValueTask DisposeAsync() => await _context.DisposeAsync();

        public void Dispose() => _context?.Dispose();
    }
}