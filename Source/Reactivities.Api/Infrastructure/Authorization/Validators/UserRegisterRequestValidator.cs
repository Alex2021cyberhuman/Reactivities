namespace Reactivities.Api.Infrastructure.Authorization.Validators
{
    using FluentValidation;
    using Models;

    public class UserRegisterRequestValidator : AbstractValidator<UserRegisterRequest>
    {
        public UserRegisterRequestValidator()
        {
            RuleFor(x => x.Email).EmailAddress().NotEmpty();
            RuleFor(x => x.UserName).NotEmpty();
            RuleFor(x => x.DisplayName).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}