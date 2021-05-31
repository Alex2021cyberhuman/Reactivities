namespace Reactivities.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Application.Activities;
    using Base;
    using Domain;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    public class ActivitiesController : ApiController
    {
        [HttpGet(Name = nameof(GetActivityList))]
        [ProducesResponseType(typeof(IEnumerable<Activity>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetActivityList() => Ok(await Mediator.Send(List.Request.Empty));

        [HttpGet("{id:guid}", Name = nameof(GetActivityDetails))]
        [ProducesResponseType(typeof(Activity), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetActivityDetails(Guid id) => HandleExecutionResult(await Mediator.Send(Details.Request.Get(id)));
        
        [HttpPut("{id:guid}", Name = nameof(EditActivity))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditActivity([FromBody] Activity activity, [FromRoute] Guid id)
        {
            return HandleExecutionResult(await Mediator.Send(Edit.Command.Get(id, activity)));
        }

        [HttpPost(Name = nameof(CreateActivity))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleExecutionResult(await Mediator.Send(Create.Command.Get(activity)));
        }
        
        [HttpDelete("{id:guid}", Name = nameof(DeleteActivity))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteActivity([FromRoute] Guid id)
        {
            return HandleExecutionResult(await Mediator.Send(Delete.Command.Get(id)));
        }
    }
}