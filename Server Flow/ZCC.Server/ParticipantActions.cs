using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ZCC.Entities;
using RestSharp.Serializers.Json;

namespace ZCC.Server
{
    public static class ParticipantActions
    {
        [FunctionName("ParticipantActions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", "put", Route = "ParticipantActions/{action}/{userID}/{competitionID?}/{teamID?}")] HttpRequest req, string action, string userID,
            string competitionID, string teamID, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            switch (action)
            {
                case "FindParticipantTeam":
                    teamID = MainManager.Instance.participantsManager.FindParticipantTeam(userID, competitionID);
                    if (teamID != null) { return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(teamID)); }
                    return new BadRequestResult();
            }

            return new NotFoundObjectResult("404 Not Found");
        }
    }
}