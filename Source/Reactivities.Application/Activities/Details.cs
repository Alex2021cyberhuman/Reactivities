namespace Reactivities.Application.Activities
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Domain;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class Details
    {
        public class Request : IRequest<Activity>
        {
            private Request(Guid id)
            {
                Id = id;
            }

            public Guid Id { get; }

            public static Request Get(Guid id) => new Request(id);
        }
        
        public class RequestHandler : IRequestHandler<Request, Activity>
        {
            private readonly DataContext _context;

            public RequestHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Request request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FirstOrDefaultAsync(activity => activity.Id == request.Id, cancellationToken: cancellationToken);
            }
        }
    }
}