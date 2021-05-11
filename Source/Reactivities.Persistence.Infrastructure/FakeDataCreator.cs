namespace Reactivities.Persistence.Infrastructure
{
    using System.Collections.Generic;
    using System.Linq;
    using Bogus;
    using Domain;
    using Interfaces;

    internal class FakeDataCreator : IDataCreator
    {
        private List<Activity> _activities;

        public IReadOnlyCollection<Activity> Activities => _activities ??= new Faker<Activity>()
            .Rules((faker, activity) =>
            {
                activity.Title = faker.Name.JobTitle();
                activity.Category = faker.Name.JobType();
                activity.City = faker.Address.City();
                activity.Description = faker.Name.JobDescriptor();
                activity.Date = faker.Date.Future();
            })
            .GenerateForever()
            .Take(25)
            .ToList();
    }
}