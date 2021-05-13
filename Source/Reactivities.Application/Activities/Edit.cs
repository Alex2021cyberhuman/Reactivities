namespace Reactivities.Application.Activities
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using Domain;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
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
            private readonly IMapper _mapper;
            
            public CommandHandler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }        
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var oldActivity = await _context.Activities.FirstOrDefaultAsync(a => a.Id ==  request.Id, cancellationToken);
                var updatedActivity = _mapper.Map(request.ActivityToEdit, oldActivity);
                _context.Activities.Update(updatedActivity);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}