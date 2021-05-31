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

    public class AccessTokenProviderOptions
    {
        // ReSharper disable once UnusedMember.Global
        public AccessTokenProviderOptions()
        {
        }

        public AccessTokenProviderOptions(string securityKey, string issuer, string audience, TimeSpan expiryTime)
        {
            SecurityKey = securityKey;
            Issuer = issuer;
            Audience = audience;
            ExpiryTime = expiryTime;
        }

        public string SecurityKey { get; set; }
        public SecurityKey SymmetricSecurityKey => new SymmetricSecurityKey(UTF8.GetBytes(SecurityKey));

        public string Issuer { get; set; }
        public string Audience { get; set; }
        public TimeSpan ExpiryTime { get; set; }
    }

    public class AccessTokenProvider : IAccessTokenProvider
    {
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        private readonly AccessTokenProviderOptions _options;
        private readonly IUserClaimsPrincipalFactory<User> _factory;

        public AccessTokenProvider(JwtSecurityTokenHandler jwtSecurityTokenHandler,
            AccessTokenProviderOptions options, IUserClaimsPrincipalFactory<User> factory)
        {
            _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
            _options = options;
            _factory = factory;
        }

        public async Task<AccessTokenResponse> GenerateTokenAsync(User user)
        {
            var claims = await _factory.CreateAsync(user);
            var jwtHeader = new JwtHeader(new SigningCredentials(
                _options.SymmetricSecurityKey, SecurityAlgorithms.HmacSha512Signature));
            var expires = DateTime.UtcNow.Add(_options.ExpiryTime);
            var innerToken =
                new JwtPayload(_options.Issuer, _options.Audience, claims.Claims, DateTime.MinValue, expires);
            var securityToken = new JwtSecurityToken(jwtHeader, innerToken);
            return new()
            {
                Token = _jwtSecurityTokenHandler.WriteToken(securityToken),
                Expires = expires
            };
        }
    }
}