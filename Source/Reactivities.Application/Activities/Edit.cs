namespace Reactivities.Application.Activities
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using Core;
    using Core.Validators;
    using Domain;
    using FluentValidation;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class Edit
    {
        public class Command : IRequest<ExecutionResult<Unit>>
        {
            public Guid Id { get; }
            public Activity ActivityToEdit { get; }

            private Command(Guid id, Activity activityToEdit)
            {
                Id = id;
                ActivityToEdit = activityToEdit;
                ActivityToEdit.Id = Id;
            }

            public static Command Get(Guid id, Activity activityToEdit) => new Command(id, activityToEdit);
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(ActivityValidator activityValidator)
            {
                RuleFor(x => x.ActivityToEdit).SetValidator(activityValidator);
            }
        }

        public class CommandHandler : IRequestHandler<Command, ExecutionResult<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly CommandValidator _commandValidator;

            public CommandHandler(DataContext context, IMapper mapper, CommandValidator commandValidator )
            {
                _context = context;
                _mapper = mapper;
                _commandValidator = commandValidator;
            }        
            
            public async Task<ExecutionResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var oldActivity = await _context.Activities.FirstOrDefaultAsync(a => a.Id ==  request.Id, cancellationToken);
                if (oldActivity is null)
                    return ExecutionResult.Missing<Unit>();
                var validationResult = await _commandValidator.ValidateAsync(request, cancellationToken);
                if (!validationResult.IsValid)
                    return ExecutionResult.Invalid<Unit>(validationResult);
                var updatedActivity = _mapper.Map(request.ActivityToEdit, oldActivity);
                _context.Activities.Update(updatedActivity);
                await _context.SaveChangesAsync(cancellationToken);
                return ExecutionResult.SuccessUnit();
            }
        }
    }
}