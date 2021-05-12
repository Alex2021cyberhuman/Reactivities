namespace Reactivities.Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Application.Activities;
    using Base;
    using Domain;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    public class ActivitiesController : ApiController
    {
        [HttpGet(Name = nameof(GetActivitiesList))]
        [ProducesResponseType(typeof(Activity), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetActivitiesList() => Ok(await Mediator.Send(List.Request.Empty));

        [HttpGet("{id:guid}", Name = nameof(GetActivityDetails))]
        [ProducesResponseType(typeof(Activity), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetActivityDetails(Guid id) => Ok(await Mediator.Send(Details.Request.Get(id)));
        
        [HttpPut("{id:guid}", Name = nameof(EditActivities))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditActivities([FromBody] Activity activity, [FromRoute] Guid id)
        {
            await Mediator.Send(Edit.Command.Get(id, activity));
            return Ok();
        }

        [HttpPost(Name = nameof(CreateActivity))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(Create.Command.Get(activity));
            return Ok();
        }
    }
}