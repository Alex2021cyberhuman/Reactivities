namespace Reactivities.Api.Controllers
{
    using System.Threading.Tasks;
    using AutoMapper;
    using Base;
    using Domain;
    using Infrastructure.Authorization;
    using Infrastructure.Authorization.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    [AllowAnonymous]
    public class AccountController : ApiController
    {
        [HttpPost(nameof(Register))]
        [ProducesResponseType(typeof(AccessTokenResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> Register(UserRegisterRequest request, [FromServices] IMapper mapper, [FromServices] UserManager<User> userManager, [FromServices] IAccessTokenProvider provider)
        {
            var user = mapper.Map<UserRegisterRequest, User>(request);
            var result = await userManager.CreateAsync(user);
            if (result.Succeeded) return Ok(await provider.GenerateTokenAsync(user) );
            foreach (var identityError in result.Errors)
                ModelState.AddModelError(identityError.Code, identityError.Description);
            return BadRequest(ModelState);
        }
        
        [HttpPost(nameof(Login))]
        [ProducesResponseType(typeof(AccessTokenResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login(UserLoginRequest request, [FromServices] IMapper mapper, [FromServices] UserManager<User> userManager, [FromServices] IAccessTokenProvider provider, [FromServices] SignInManager<User> signInManager)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user is null)
                return Unauthorized();
            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (result.Succeeded) return Ok(await provider.GenerateTokenAsync(user));
            return Unauthorized();
        }
        
        [HttpGet]
        [ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCurrent([FromServices] IMapper mapper, [FromServices] UserManager<User> userManager, [FromServices] IAccessTokenProvider provider, [FromServices] SignInManager<User> signInManager)
        {
            var user = await userManager.GetUserAsync(User);
            if (user is null)
                return Unauthorized();
            return Ok(mapper.Map<User, UserResponse>(user));
        }
    }
}