namespace Reactivities.Application.Activities
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; }

            private Command(Guid id) => Id = id;

            public static Command Get(Guid id) => new(id);
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
                var activityToDelete = await 
                    _context.Activities.FirstOrDefaultAsync(activity => activity.Id == request.Id, cancellationToken);
                _context.Activities.Remove(activityToDelete);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}