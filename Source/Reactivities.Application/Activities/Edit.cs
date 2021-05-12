namespace Reactivities.Application.Activities
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Domain;
    using MediatR;
    using Persistence;

    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; }
            public Activity ActivityToEdit { get; }

            private Command(Guid id, Activity activityToEdit)
            {
                Id = id;
                ActivityToEdit = activityToEdit;
            }

            public static Command Get(Guid id, Activity activityToEdit) => new Command(id, activityToEdit);
        }
        
        public class CommandHandler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public CommandHandler(DataContext context)
            {
                _context = context;
            }        
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                request.ActivityToEdit.Id = request.Id;
                _context.Activities.Update(request.ActivityToEdit);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}