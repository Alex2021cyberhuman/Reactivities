namespace Reactivities.Api.Controllers.Base
{
    using System;
    using Application.Core;
    using FluentValidation.AspNetCore;
    using FluentValidation.Results;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.DependencyInjection;

    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();

        protected IActionResult HandleExecutionResult<T>(ExecutionResult<T> result)
        {
            return result.Type switch
            {
                ExecutionResultType.Success => result.Value is null or Unit? Ok() : Ok(result.Value),
                ExecutionResultType.Invalid => CreateValidationRequest(result),
                ExecutionResultType.Missing => NotFound(),
                ExecutionResultType.Other => NoContent(),
                _ => throw new NotImplementedException()
            };
        }
        
        private IActionResult CreateValidationRequest<T>(ExecutionResult<T> executionResult)
        {
            if (executionResult.Extensions is not ValidationResult validationResult)
                return executionResult.Extensions is not null ? BadRequest(executionResult.Extensions) : BadRequest();
            validationResult.AddToModelState(ModelState, string.Empty);
            return BadRequest(ModelState);
        }
    }
}