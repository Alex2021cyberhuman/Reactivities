namespace Reactivities.Domain
{
    using System;
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser<Guid>
    {
        public User()
        {
        }

        public User(string userName) : base(userName)
        {
        }

        public string DisplayName { get; set; }

        public string ImageUrl { get; set; }
    }
}