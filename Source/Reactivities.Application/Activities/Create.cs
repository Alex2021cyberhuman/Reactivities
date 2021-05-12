namespace Reactivities.Application.Activities
{
    using System.Threading;
    using System.Threading.Tasks;
    using Domain;
    using MediatR;
    using Persistence;

    public class Create
    {
        public class Command : IRequest
        {
            public Activity ActivityToCreate { get; }

            private Command(Activity activityToCreate)
            {
                ActivityToCreate = activityToCreate;
            }

            public static Command Get(Activity activity) => new(activity);
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
                _context.Activities.Add(request.ActivityToCreate);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}