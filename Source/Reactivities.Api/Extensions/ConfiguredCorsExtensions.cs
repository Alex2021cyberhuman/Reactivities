namespace Reactivities.Api.Infrastructure
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    
    
    public static class ConfiguredCorsExtensions
    {
        private const string PolicyName = "DefaultPolicy";
        private const string CorsSectionName = "Cors";
        private const string OriginsName = "Origins";
        private static char[] OriginsSeparators => new[] {';'};
        
        
        public static IServiceCollection AddConfiguredCors(this IServiceCollection services, IConfiguration configuration)
        {
            var section = configuration.GetSection(CorsSectionName);
            var origins = section[OriginsName].Split(OriginsSeparators);
            services.AddCors(options => options.AddPolicy(
                PolicyName,
                builder => builder.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins(origins)));
            return services;
        }

        public static IApplicationBuilder UseConfiguredCors(this IApplicationBuilder app) => app.UseCors(PolicyName);
    }
}