using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using static System.Collections.Specialized.BitVector32;
using System.Reflection;
using ZCC.Entities;
using System.Collections.Generic;
using RestSharp;
using ZCC.Models;

namespace ZCC.Server
{
    public static class UsersCompetitions
    {
        [FunctionName("UsersCompetitions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "UsersCompetitions/{action}/{userid}/{competitionID?}/{teamID?}/{enterPoint?}")] HttpRequest req,
           string action, string userid, string competitionID, string teamID, string enterPoint, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

            switch (action)
            {
                case "EnableCompetition":

                    //check if the request sent by
                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userid, competitionID))
                    {
                        //update competition
                        return new OkObjectResult(true);
                    }

                    break;

                case "GetAllManagerCompetition":

                    return new OkObjectResult(MainManager.Instance.competitionsManager.allUserCompetitions(userid, 1));

                case "GetAllParticipantCompetition":

                    return new OkObjectResult(MainManager.Instance.competitionsManager.allUserCompetitions(userid, 0));

                case "GetCompetition":

                    return new OkObjectResult(MainManager.Instance.competitionsManager.UserCompetitionManager(userid, competitionID));

                case "UpdateCompetition":
                    try
                    {
                        Competition competition = System.Text.Json.JsonSerializer.Deserialize<Competition>(requestBody);
                        if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userid, competition.id.ToString()))
                        {
                            bool ll = MainManager.Instance.competitionsManager.UpdateCompetition(competition);
                            return new OkObjectResult(ll);
                        }
                        else
                        {
                            return new OkObjectResult(false);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        return new OkObjectResult(false);
                    }
                case "UpdateCompetitionStatus":
                    try
                    {
                        if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userid, competitionID))
                        {
                            MainManager.Instance.competitionsManager.ChangeCompetitionStatus(competitionID, requestBody);
                            return new OkObjectResult(true);
                        }
                        else
                        {
                            return new OkObjectResult(false);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        return new OkObjectResult(false);
                    }
                case "UpdateCategory":
                    try
                    {
                        MainManager.Instance.categoriesManager.setNewCategory(requestBody);
                        return new OkObjectResult(200);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        return new OkObjectResult(false);
                    }
                case "UpdateTask":
                    try
                    {
                        if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userid, competitionID))
                        {
                            Models.Task task = System.Text.Json.JsonSerializer.Deserialize<Models.Task>(requestBody);
                            MainManager.Instance.taskManager.setNewTask(task);
                            return new OkObjectResult(true);
                        }
                        else
                        {
                            return new OkObjectResult(false);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        return new OkObjectResult(false);
                    }
                    
                case "ConfirmSubmittedTask":

                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userid, competitionID))
                    {
                        //get the active task
                        ActiveTasks activeTasks = System.Text.Json.JsonSerializer.Deserialize<ActiveTasks>(requestBody);
                        //get Teams Point Before update current Task Point
                        int teamPointBefore = MainManager.Instance.teamsManager.GetTeamsPoint(activeTasks.teamID.ToString());
                        //Update Teams Point
                        MainManager.Instance.teamsManager.UpdateTeamsPoint(activeTasks.teamID.ToString(), enterPoint);
                        //get Teams Point After update current Task Point
                        int teamPointAfter = MainManager.Instance.teamsManager.GetTeamsPoint(activeTasks.teamID.ToString());
                        //check if the teams Point is Update
                        if (teamPointBefore+ int.Parse(enterPoint) ==teamPointAfter)
                        {
                            //Update Active Task Status To Done
                            string currentStatus = MainManager.Instance.activeTasksManager.UpdateTaskStatusToDone(activeTasks.id.ToString());
                            return new OkObjectResult(currentStatus);
                        }
                        return new BadRequestObjectResult(false);
                    }
                    return new BadRequestObjectResult("NO ACCESS");


                default:
                    break;
            }
            return new NotFoundObjectResult("404 Not Found");
        }
    }
}