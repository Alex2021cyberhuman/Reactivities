namespace Reactivities.Api.Extensions
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using Domain;
    using Infrastructure.Authorization;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;
    using Persistence;

    public static class AuthorizationExtensions
    {
        public static IApplicationBuilder UseConfiguredAuthorization(this IApplicationBuilder app) =>
            app.UseAuthentication()
                .UseAuthorization();

        public static IServiceCollection AddCustomAuthorization(this IServiceCollection services,
            AccessTokenProviderOptions options) =>
            services.AddSingleton(options)
                .AddJwt(options)
                .AddMyIdentity();


        public static IServiceCollection AddJwt(this IServiceCollection services,
            AccessTokenProviderOptions options) =>
            services
                .AddAuthentication(configure => configure.DefaultScheme = JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(bearerOptions =>
                {
                    bearerOptions.IncludeErrorDetails = true;
                    bearerOptions.RequireHttpsMetadata = false;
                    bearerOptions.TokenValidationParameters = new()
                    {
                        IssuerSigningKey = options.SymmetricSecurityKey,
                        ValidIssuer = options.Issuer,
                        ValidAudience = options.Audience,
                        ClockSkew = TimeSpan.Zero,
                        ValidateLifetime = true
                    };
                })
                .Services
                .AddAuthorization(authorizationOptions =>
                {
                    var defaultPolicyBuilder = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme);
                    defaultPolicyBuilder.RequireClaim(ClaimTypes.NameIdentifier);
                    defaultPolicyBuilder.RequireClaim(ClaimTypes.Name);
                    authorizationOptions.DefaultPolicy = defaultPolicyBuilder.Build();
                })
                .AddSingleton<JwtSecurityTokenHandler>()
                .AddScoped<IAccessTokenProvider, AccessTokenProvider>();
    }

    public static class IdentityExtensions
    {
        public static IServiceCollection AddMyIdentity(this IServiceCollection services) =>
            services.AddIdentityCore<User>()
                .AddSignInManager()
                .AddEntityFrameworkStores<DataContext>()
                .AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<User>>()
                .AddDefaultTokenProviders()
                .Services;
    }
}