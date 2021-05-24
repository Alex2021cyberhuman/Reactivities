namespace Reactivities.Api.Infrastructure.Authorization
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Threading.Tasks;
    using Domain;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using static System.Text.Encoding;

    public record AccessTokenProviderOptions (string SecurityKey, string Issuer, string Audience, TimeSpan ExpiryTime);

    public class AccessTokenProvider : IAccessTokenProvider
    {
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        private readonly IOptionsMonitor<AccessTokenProviderOptions> _options;
        private readonly IUserClaimsPrincipalFactory<User> _factory;

        public AccessTokenProvider(JwtSecurityTokenHandler jwtSecurityTokenHandler, IOptionsMonitor<AccessTokenProviderOptions> options, IUserClaimsPrincipalFactory<User> factory)
        {
            _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
            _options = options;
            _factory = factory;
        }
        public async Task<string> GenerateToken(User user)
        {
            var options = _options.CurrentValue;
            var claims = await _factory.CreateAsync(user);
            var jwtHeader = new JwtHeader(new SigningCredentials(new SymmetricSecurityKey(UTF8.GetBytes(options.SecurityKey)), SecurityAlgorithms.HmacSha512Signature));
            var expires = DateTime.UtcNow.Add(options.ExpiryTime);
            var innerToken = new JwtPayload(options.Issuer, options.Audience,  claims.Claims, DateTime.MinValue, expires);
            var securityToken = new JwtSecurityToken(jwtHeader, innerToken);
            return _jwtSecurityTokenHandler.WriteToken(securityToken);
        }
    }
}