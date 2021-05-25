namespace Reactivities.Api.Infrastructure.Authorization.Models
{
    using System;

    public record AccessTokenResponse
    {
        public string Token { get; init; }
        public DateTime Expires { get; init; }
    }
}