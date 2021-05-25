namespace Reactivities.Persistence.Infrastructure.Interfaces
{
    using System.Collections.Generic;
    using Domain;

    public interface IDataCreator
    {
        public IReadOnlyCollection<Activity> Activities { get; }
        public IReadOnlyCollection<User> Users { get; }
    }
}