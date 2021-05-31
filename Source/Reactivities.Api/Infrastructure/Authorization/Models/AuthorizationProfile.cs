namespace Reactivities.Api.Infrastructure.Authorization.Models
{
    using AutoMapper;
    using Domain;

    public class AuthorizationProfile : Profile
    {
        public AuthorizationProfile()
        {
            CreateMap<UserRegisterRequest, User>();
            CreateMap<User, UserResponse>();
        }
    }
}