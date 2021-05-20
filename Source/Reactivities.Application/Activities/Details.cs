namespace Reactivities.Application.Activities
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Core;
    using Domain;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class Details
    {
        public class Request : IRequest<ExecutionResult<Activity>>
        {
            private Request(Guid id)
            {
                Id = id;
            }

            public Guid Id { get; }

            public static Request Get(Guid id) => new Request(id);
        }
        
        public class RequestHandler : IRequestHandler<Request, ExecutionResult<Activity>>
        {
            private readonly DataContext _context;

            public RequestHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<ExecutionResult<Activity>> Handle(Request request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);
                return activity is null ? ExecutionResult.Missing<Activity>() : ExecutionResult.Success(activity);
            }
        }
    }
}