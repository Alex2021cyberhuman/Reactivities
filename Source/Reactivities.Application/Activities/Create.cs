namespace Reactivities.Application.Activities
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Core;
    using Core.Validators;
    using Domain;
    using FluentValidation;
    using FluentValidation.Validators;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class Create
    {
        public class Command : IRequest<ExecutionResult<Unit>>
        {
            public Activity ActivityToCreate { get; }

            private Command(Activity activityToCreate)
            {
                ActivityToCreate = activityToCreate;
            }

            public static Command Get(Activity activity) => new(activity);
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(ActivityValidator activityValidator, DataContext context)
            {
                RuleFor(x => x.ActivityToCreate).SetValidator(activityValidator);
                RuleFor(x => x.ActivityToCreate.Id).SetAsyncValidator(
                    new AsyncPredicateValidator<Command, Guid>(async (_, id, validationContext, cancellationToken) =>
                    {
                        if (!validationContext.IsAsync && !context.Activities.Any(a => a.Id == id))
                            return true;
                        if (!await context.Activities.AnyAsync(a => a.Id == id, cancellationToken: cancellationToken))
                            return true;
                        validationContext.AddFailure("Invalid id for creation");
                        return false;
                    }));
            }
        }
        
        public class CommandHandler : IRequestHandler<Command, ExecutionResult<Unit>>
        {
            private readonly DataContext _context;
            private readonly CommandValidator _commandValidator;

            public CommandHandler(DataContext context, CommandValidator commandValidator)
            {
                _context = context;
                _commandValidator = commandValidator;
            }           

            public async Task<ExecutionResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var validationResult = await _commandValidator.ValidateAsync(request, cancellationToken);
                if (!validationResult.IsValid)
                    return ExecutionResult.Invalid<Unit>(validationResult);
                _context.Activities.Add(request.ActivityToCreate);
                await _context.SaveChangesAsync(cancellationToken);
                return ExecutionResult.SuccessUnit();
            }
        }
    }
}