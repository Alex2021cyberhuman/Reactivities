namespace Reactivities.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Application.Activities;
    using Base;
    using Domain;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    public class ActivitiesController : ApiController
    {
        [HttpGet(Name = nameof(GetActivityList))]
        [ProducesResponseType(typeof(IEnumerable<Activity>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetActivityList() => Ok(await Mediator.Send(List.Request.Empty));

        [HttpGet("{id:guid}", Name = nameof(GetActivityDetails))]
        [ProducesResponseType(typeof(Activity), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetActivityDetails(Guid id) => Ok(await Mediator.Send(Details.Request.Get(id)));
        
        [HttpPut("{id:guid}", Name = nameof(EditActivity))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditActivity([FromBody] Activity activity, [FromRoute] Guid id)
        {
            await Mediator.Send(Edit.Command.Get(id, activity));
            return Ok();
        }

        [HttpPost(Name = nameof(CreateActivity))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(Create.Command.Get(activity));
            return Ok();
        }
        
        [HttpDelete("{id:guid}", Name = nameof(DeleteActivity))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteActivity([FromRoute] Guid id)
        {
            await Mediator.Send(Delete.Command.Get(id));
            return Ok();
        }
    }
}