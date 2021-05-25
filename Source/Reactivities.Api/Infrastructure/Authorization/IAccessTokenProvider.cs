namespace Reactivities.Api.Infrastructure.Authorization
{
    using System.Threading.Tasks;
    using Domain;
    using Models;

    public interface IAccessTokenProvider
    {
        Task<AccessTokenResponse> GenerateTokenAsync(User user);
    }
}