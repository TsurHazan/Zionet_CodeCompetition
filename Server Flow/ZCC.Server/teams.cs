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
using ZCC.Data.Sql;

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
                    if (!MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID)) { return new BadRequestObjectResult("No Permissions"); }
                    return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(MainManager.Instance.teamsManager.GetAllTeamsInCompetition(competitionID)));

                case "CreateNewTeam":
                    if (!MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID)) { return new BadRequestObjectResult("No Permissions"); }
                    MainManager.Instance.teamsManager.AddTeamToCompetition(competitionID);
                    return new OkObjectResult(200);

                case "GetTeamMembers":
                    if (!MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID)) { return new BadRequestObjectResult("No Permissions"); }
                    Team team = System.Text.Json.JsonSerializer.Deserialize<Models.Team>(requestBody);
                    Dictionary<string, User> members = MainManager.Instance.teamsManager.GetTeamMembers(team.CompetitionID, team.id);
                    return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(members));

                case "UpdateTeams":
                    if (!MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID)) { return new BadRequestObjectResult("No Permissions"); }
                    User[] Usersteam = JsonConvert.DeserializeObject<User[]>(requestBody);
                    MainManager.Instance.teamsManager.UpdateTeam(Usersteam, competitionID, teamID);
                    return new OkResult();
                case "GetAllLiveTeams":                    
                    Dictionary<int, TeamLive> Dteam = MainManager.Instance.teamsManager.GetAllLiveTeams(competitionID);
                    foreach (TeamLive onTteam in Dteam.Values)
                    {
                        string Tid = onTteam.id.ToString();
                        int tasksFinished = MainManager.Instance.teamsManager.GetTeamsCountTasksFinished(Tid);
                        int potentialPoint = MainManager.Instance.teamsManager.GetPotentialPoint(Tid);
                        onTteam.tasksFinished = tasksFinished;
                        onTteam.potentialPoint = potentialPoint;
                    }                    
                    return new OkObjectResult(Dteam);

            }

            return new NotFoundObjectResult("404 Not Found");
        }
    }
}