namespace Reactivities.Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Base;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class ActivitiesController : ApiController
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context) => _context = context;

        [HttpGet(Name = nameof(GetActivities))]

        public async Task<IActionResult> GetActivities() => Ok(await _context.Activities.AsNoTracking().ToListAsync());

        [HttpGet("{id:guid}", Name = nameof(GetActivity))]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var activity = await _context.Activities.FindAsync(id);
            return activity is null ? (IActionResult) NotFound() : Ok(activity);
        }
    }
}