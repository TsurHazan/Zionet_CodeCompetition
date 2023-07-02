using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using ZCC.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ZCC.ServerAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class Users : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string auth0Bearer;
        public Users(IConfiguration configuration)
        {
            _configuration = configuration;
            auth0Bearer = _configuration["Auth0Bearer:Value"];
        }

        [HttpGet("/getRole/{userId}")]
        public async Task<IActionResult> getRole(string userId)
        {
            //_logger.LogInformation("API endpoint accessed: GET /api/users/{action}/{userId}/{competitionId}");

            var request = new RestRequest("", Method.Get);
            request.AddHeader("authorization", auth0Bearer);
            var urlGetRoles = $"https://dev-7utdtaoji4hz5ngu.us.auth0.com/api/v2/users/{userId}/roles";

            var client = new RestClient(urlGetRoles);
            RestResponse response = client.Execute(request);
            string stringchars = response.Content.ToString();
            if (response.Content.Contains("System Manager")) return new OkObjectResult("System Manager");
            return Ok("no role");
        }

        [HttpGet("/getUser/{userId}")]
        public async Task<IActionResult> getUser(string userId)
        {
            //_logger.LogInformation("API endpoint accessed: GET /api/users/{action}/{userId}/{competitionId}");

            var request = new RestRequest("", Method.Get);
            request.AddHeader("authorization",auth0Bearer);

            var urlGetUser = $"https://dev-7utdtaoji4hz5ngu.us.auth0.com/api/v2/users/{userId}";
            var client = new RestClient(urlGetUser);
            var response = client.Execute(request);
            if (response != null && response.Content != null)
            {
                User user = JsonConvert.DeserializeObject<User>(response.Content);
                return new OkObjectResult(user);
            }
           return BadRequest(); 
        }
    }
}
