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
using System.Collections.Generic;

namespace ZCC.Server
{
    public static class ParticipantActions
    {
        [FunctionName("ParticipantActions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", "put", Route = "ParticipantActions/{action}/{userID}/{competitionID?}/{teamID?}/{taskID?}/{timeframe?}")] HttpRequest req, string action, string userID,
            string competitionID, string teamID, string taskID, string timeframe, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            switch (action)
            {
                case "FindParticipantTeam":
                    teamID = MainManager.Instance.userEntities.FindParticipantTeam(userID, competitionID);
                    if (teamID != null) { return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(teamID)); }
                    return new BadRequestObjectResult("Bad request");

                case "GetAvailableTasks":

                    Dictionary<int, Models.Task> GetAllAvailableTasksForTeam = MainManager.Instance.taskManager.GetAllAvailableTasksForTeam(teamID, competitionID);
                    if (GetAllAvailableTasksForTeam != null) { return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(GetAllAvailableTasksForTeam)); }
                    return new BadRequestObjectResult("Bad request");

                case "ChooseTask":
                    if (MainManager.Instance.userEntities.checkIfParticipantIsInTeam(userID, competitionID, teamID))
                    {
                        if (MainManager.Instance.taskManager.ChooseTask(competitionID, teamID, taskID, timeframe) != null)
                        {
                            return new OkObjectResult($"Confirmed");
                        }
                        else
                        {
                            return new BadRequestObjectResult("You cant choose Task");
                        }
                    }
                    return new BadRequestObjectResult("You cant choose task because you are not in this team");
            }

            return new NotFoundObjectResult("404 Not Found");
        }
    }
}