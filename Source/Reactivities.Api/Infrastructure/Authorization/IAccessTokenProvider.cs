namespace Reactivities.Api.Infrastructure.Authorization
{
    using System.Threading.Tasks;
    using Domain;

    public interface IAccessTokenProvider
    {
        Task<string> GenerateToken(User user);
    }
}