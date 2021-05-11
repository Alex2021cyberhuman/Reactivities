namespace Reactivities.Persistence
{
    using Domain;
    using Microsoft.EntityFrameworkCore;

    public class DataContext : DbContext
    {
        protected DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
    }
}