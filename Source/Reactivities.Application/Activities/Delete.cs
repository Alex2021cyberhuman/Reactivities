namespace Reactivities.Application.Activities
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Core;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class Delete
    {
        public class Command : IRequest<ExecutionResult<Unit>>
        {
            public Guid Id { get; }

            private Command(Guid id) => Id = id;

            public static Command Get(Guid id) => new(id);
        }
        
        public class CommandHandler : IRequestHandler<Command, ExecutionResult<Unit>>
        {
            private readonly DataContext _context;

            public CommandHandler(DataContext context)
            {
                _context = context;
            }        
            
            public async Task<ExecutionResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityToDelete = await 
                    _context.Activities.FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);
                if (activityToDelete is null)
                    return ExecutionResult.Missing<Unit>();
                _context.Activities.Remove(activityToDelete);
                await _context.SaveChangesAsync(cancellationToken);
                return ExecutionResult.SuccessUnit();
            }
        }
    }
}