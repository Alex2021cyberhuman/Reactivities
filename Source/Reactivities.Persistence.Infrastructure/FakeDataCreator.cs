namespace Reactivities.Persistence.Infrastructure
{
    using System.Collections.Generic;
    using System.Linq;
    using Bogus;
    using Domain;
    using Interfaces;

    public class FakeDataCreator : IDataCreator
    {
        private readonly string[] _categories =
        {
            "Culture",
            "Drinks",
            "Film",
            "Food",
            "Music",
            "Travel"
        };
        
        private List<Activity> _activities;

        public IReadOnlyCollection<Activity> Activities => _activities ??= new Faker<Activity>()
            .Rules((faker, activity) =>
            {
                activity.Title = faker.Lorem.Sentence();
                activity.Category = faker.PickRandom(_categories);
                activity.City = faker.Address.City();
                activity.Description = faker.Lorem.Paragraph();
                activity.Date = faker.Date.Future();
                activity.Venue = faker.Address.SecondaryAddress();
            })
            .GenerateForever()
            .Take(25)
            .ToList();
    }
}