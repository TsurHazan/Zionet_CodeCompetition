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

namespace ZCC.Server
{
    public static class teams
    {
        [FunctionName("teams")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "teams/{action}/{userID}/{competitionID}")] HttpRequest req, string action, string userID, string competitionID,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            switch (action)
            {
                case "GetAllTeamsInCompetition":
                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID))
                    {
                        return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(MainManager.Instance.teamsManager.GetAllTeamsInCompetition(competitionID)));
                    }
                    break;

                case "CreateNewTeam":
                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID))
                    {
                        return new OkObjectResult(MainManager.Instance.teamsManager.AddTeamToCompetition(competitionID).ToString());
                    }

                    break;
            }

            return new OkObjectResult("null");
        }
    }
}