namespace Reactivities.Persistence.Infrastructure
{
    using System.Collections.Generic;
    using System.Linq;
    using Bogus;
    using Domain;
    using Interfaces;
    using Microsoft.AspNetCore.Identity;

    public class FakeDataCreator : IDataCreator
    {
        private readonly IPasswordHasher<User> _passwordHasher;

        public FakeDataCreator(IPasswordHasher<User> passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }
        
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
        private List<User> _users;
        private const string StandardPassword = "Pa$$w0rd";

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
        
        public IReadOnlyCollection<User> Users => _users ??= new Faker<User>()
            .Rules(((faker, user) =>
            {
                user.Email = faker.Internet.Email();
                user.NormalizedEmail = user.Email.Normalize().ToUpperInvariant();
                user.DisplayName = faker.Internet.UserName();
                user.UserName = faker.Internet.UserName(user.DisplayName, user.Email);
                user.NormalizedUserName = user.UserName.Normalize().ToUpperInvariant();
                user.ImageUrl = faker.Image.PicsumUrl();
                user.PhoneNumber = faker.Phone.PhoneNumber();
                user.PasswordHash = _passwordHasher.HashPassword(user, StandardPassword);
            }))
            .GenerateForever()
            .Take(25)
            .ToList();
    }
}