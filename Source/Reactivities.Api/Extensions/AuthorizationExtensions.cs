namespace Reactivities.Api.Extensions
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using Domain;
    using Infrastructure.Authorization;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Persistence;
    using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

    public static class AuthorizationExtensions
    {
        private const string DefaultScheme = "DefaultScheme";

        public static IApplicationBuilder UseConfiguredAuthorization(this IApplicationBuilder app) =>
            app.UseAuthentication()
                .UseAuthorization();

        public static IServiceCollection AddCustomAuthorization(this IServiceCollection services,
            AccessTokenProviderOptions options, IConfiguration configuration) =>
            services.Configure<AccessTokenProviderOptions>(nameof(AccessTokenProviderOptions),
                    providerOptions => configuration.Bind(nameof(AccessTokenProviderOptions), providerOptions))
                .AddIdentityCore<User>()
                .AddSignInManager()
                .AddEntityFrameworkStores<DataContext>()
                .AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<User>>()
                .AddDefaultTokenProviders()
                .Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(bearerOptions =>
                {
                    bearerOptions.Audience = options.Audience;
                    bearerOptions.ClaimsIssuer = options.Issuer;
                    bearerOptions.TokenValidationParameters = new()
                    {
                        ValidIssuer = options.Issuer,
                        ClockSkew = TimeSpan.Zero,
                        ValidAudience = options.Audience
                    };
                })
                .Services
                .AddAuthorization(authorizationOptions =>
                {
                    authorizationOptions.AddPolicy(DefaultScheme, builder =>
                    {
                        builder.RequireClaim(ClaimTypes.NameIdentifier);
                        builder.RequireClaim(ClaimTypes.Name);
                        builder.RequireAuthenticatedUser();
                    });
                })
                .AddSingleton<JwtSecurityTokenHandler>()
                .AddScoped<IAccessTokenProvider, AccessTokenProvider>();
    }
}