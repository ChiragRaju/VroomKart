using API.DTOs;
using Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : BaseApiController
    {
        [HttpGet("Unauthorized")]
        public async Task<IActionResult> GetUnauthorized()
        {
            return Unauthorized("Forbidden");
        }
        [HttpGet("badrequest")]
        public async Task<IActionResult> GetBadRequest()
        {
            return BadRequest("Not a Good Request");
        }
        [HttpGet("NotFound")]
        public async Task<IActionResult> GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("internalerror")]
        public async Task<IActionResult> GetInternalServerError()
        {
            throw new Exception("This is test Exception");
        }

        [HttpPost("validationerror")]
        public async Task<IActionResult> GetValidatingError(CreateProductDto product)
        {
            return Ok();
        }

       

    }
}
