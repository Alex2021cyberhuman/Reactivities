namespace Reactivities.Api.Controllers
{
    using Base;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [AllowAnonymous]
    public class UsersController : ApiController
    {
        public Task<IActionResult> Register(UserRegisterRequest request)
        {
            
        }
    }
}