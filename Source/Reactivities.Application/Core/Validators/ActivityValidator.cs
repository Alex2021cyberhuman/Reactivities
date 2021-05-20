namespace Reactivities.Application.Core.Validators
{
    using Domain;
    using FluentValidation;

    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}