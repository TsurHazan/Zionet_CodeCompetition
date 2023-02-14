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
using ZCC.Models;
using Newtonsoft.Json.Linq;

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

            try
            {
                switch (action)
                {
                    case "FindParticipantTeam":
                        teamID = MainManager.Instance.userEntities.FindParticipantTeam(userID, competitionID);
                        if (teamID != null) { return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(teamID)); }
                        return new BadRequestResult();

                    case "GetAvailableTasks":

                        Dictionary<int, Models.Task> GetAllAvailableTasksForTeam = MainManager.Instance.taskManager.GetAllAvailableTasksForTeam(teamID, competitionID);
                        if (GetAllAvailableTasksForTeam != null) { return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(GetAllAvailableTasksForTeam)); }
                        return new BadRequestResult();

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

                    case "TeamTasksHistory":
                        return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(MainManager.Instance.activeTasksManager.TeamTasksHistory(teamID)));

                    case "GetSolveTaskTabInformation":
                        if (MainManager.Instance.userEntities.checkIfParticipantIsInTeam(userID, competitionID, teamID) || MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userID, competitionID))
                        {
                            SolveActiveTask solveActiveTask = new SolveActiveTask();

                            solveActiveTask.teamMembers = MainManager.Instance.teamsManager.GetTeamMembers(int.Parse(competitionID), int.Parse(teamID));
                            solveActiveTask.activeTask = MainManager.Instance.activeTasksManager.GetActiveTask(taskID);
                            solveActiveTask.task = MainManager.Instance.taskManager.GetSingleTask(taskID, teamID);
                            solveActiveTask.competitionManagersInfo = MainManager.Instance.userEntities.getAllCompetitonManagers(competitionID);

                            foreach (var manager in solveActiveTask.competitionManagersInfo)
                            {
                                manager.Value.user_id = "PROTECTED";
                            }

                            return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(solveActiveTask));
                        }
                        return new BadRequestResult();

                    case "SubmitSolvedTask":
                        if (MainManager.Instance.userEntities.checkIfParticipantIsInTeam(userID, competitionID, teamID))
                        {
                            if (req.Body != null)
                            {
                                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                                SolveActiveTask solveActiveTask = JsonConvert.DeserializeObject<SolveActiveTask>(requestBody);
                                if (MainManager.Instance.activeTasksManager.SubmitSolvedTask(solveActiveTask.activeTask) == bool.TrueString)
                                {
                                    string ansewr = MainManager.Instance.activeTasksManager.AddMembersAsTaskParticipants(solveActiveTask.teamMembers, solveActiveTask.activeTask.id);
                                }

                                return new OkObjectResult("");
                            }
                            return new BadRequestResult();
                        }

                        break;
                }
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }

            return new NotFoundObjectResult("404 Not Found");
        }
    }
}