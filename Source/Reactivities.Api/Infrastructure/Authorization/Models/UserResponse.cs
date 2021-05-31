namespace Reactivities.Api.Infrastructure.Authorization.Models
{
    using System;

    public record UserResponse
    {
        public Guid Id { get; set; }

        public string UserName { get; init; }
        
        public string DisplayName { get; init; }

        public string Email { get; init; }

        public string Password { get; init; }

        public string ImageUrl { get; init; }
    }
}