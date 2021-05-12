namespace Reactivities.Application.Core.MappingProfiles
{
    using AutoMapper;
    using Domain;

    public class Activities : Profile
    {
        public Activities()
        {
            CreateMap<Activity, Activity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
        }
    }
}