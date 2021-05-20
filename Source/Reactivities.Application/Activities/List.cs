namespace Reactivities.Application.Activities
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Domain;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class List
    {
        public class Request : IRequest<IEnumerable<Activity>>
        {
            public static Request Empty => new();
        }

        public class RequestHandler : IRequestHandler<Request, IEnumerable<Activity>>
        {
            private readonly DataContext _context;

            public RequestHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Activity>> Handle(Request request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}