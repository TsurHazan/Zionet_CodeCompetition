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
using ZCC.Models;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace ZCC.Server
{
    public static class teams
    {
        [FunctionName("teams")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "teams/{action}/{userID}/{competitionID}/{teamID?}")] HttpRequest req, string action, string userID, string competitionID,
            string teamID, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

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
                        MainManager.Instance.teamsManager.AddTeamToCompetition(competitionID);
                        return new OkObjectResult("successfully");
                    }
                    break;

                case "GetTeamMembers":
                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID))
                    {
                        Team team = System.Text.Json.JsonSerializer.Deserialize<Models.Team>(requestBody);
                        Dictionary<string, User> members = MainManager.Instance.teamsManager.GetTeamMembers(team.CompetitionID, team.id);
                        return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(members));
                    }

                    break;

                case "UpdateTeams":

                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID))
                    {
                        User[] team = JsonConvert.DeserializeObject<User[]>(requestBody);

                        MainManager.Instance.teamsManager.UpdateTeam(team, competitionID, teamID);
                    }
                    break;
            }

            return new OkObjectResult("null");
        }
    }
}