namespace Reactivities.Api.Infrastructure.Authorization
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Threading.Tasks;
    using Domain;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using Models;
    using static System.Text.Encoding;

    public record AccessTokenProviderOptions
    {
        public AccessTokenProviderOptions()
        {
        }

        public AccessTokenProviderOptions(string securityKey, string issuer, string audience, TimeSpan expiryTime)
        {
            this.SecurityKey = securityKey;
            this.Issuer = issuer;
            this.Audience = audience;
            this.ExpiryTime = expiryTime;
        }

        public string SecurityKey { get; init; } =
            "A632E65A-2153-4F20-A86D-D5BF45BA223A" +
            "9C703E82-0EE4-4336-AB6C-D805892D7323" +
            "E72814B0-F2B4-4910-8F07-B4D0171CF0A0";

        public string Issuer { get; init; } = "localhost";
        public string Audience { get; init; } = "localhost";
        public TimeSpan ExpiryTime { get; init; } = TimeSpan.FromDays(7);

        public void Deconstruct(out string SecurityKey, out string Issuer, out string Audience, out TimeSpan ExpiryTime)
        {
            SecurityKey = this.SecurityKey;
            Issuer = this.Issuer;
            Audience = this.Audience;
            ExpiryTime = this.ExpiryTime;
        }
    }

    public class AccessTokenProvider : IAccessTokenProvider
    {
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        private readonly IOptionsMonitor<AccessTokenProviderOptions> _options;
        private readonly IUserClaimsPrincipalFactory<User> _factory;

        public AccessTokenProvider(JwtSecurityTokenHandler jwtSecurityTokenHandler,
            IOptionsMonitor<AccessTokenProviderOptions> options, IUserClaimsPrincipalFactory<User> factory)
        {
            _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
            _options = options;
            _factory = factory;
        }

        public async Task<AccessTokenResponse> GenerateTokenAsync(User user)
        {
            var options = _options.CurrentValue;
            var claims = await _factory.CreateAsync(user);
            var jwtHeader = new JwtHeader(new SigningCredentials(
                new SymmetricSecurityKey(UTF8.GetBytes(options.SecurityKey)), SecurityAlgorithms.HmacSha512Signature));
            var expires = DateTime.UtcNow.Add(options.ExpiryTime);
            var innerToken =
                new JwtPayload(options.Issuer, options.Audience, claims.Claims, DateTime.MinValue, expires);
            var securityToken = new JwtSecurityToken(jwtHeader, innerToken);
            return new()
            {
                Token = _jwtSecurityTokenHandler.WriteToken(securityToken),
                Expires = expires
            };
        }
    }
}