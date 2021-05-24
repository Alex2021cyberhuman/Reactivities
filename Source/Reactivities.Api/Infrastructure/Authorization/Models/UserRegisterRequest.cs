namespace Reactivities.Api.Infrastructure.Authorization.Models
{
    public record UserRegisterRequest
    {
        public string UserName { get; init; }
        
        public string DisplayName { get; init; }

        public string Email { get; init; }

        public string Password { get; init; }
    }
}