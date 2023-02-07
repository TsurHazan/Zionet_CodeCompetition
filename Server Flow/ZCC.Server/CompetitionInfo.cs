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

namespace ZCC.Server
{
    public static class CompetitionInfo
    {
        [FunctionName("CompetitionInfo")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "Competition/{action}/{userid?}/{competitionID?}")] HttpRequest req,
           string action, string userid, string competitionID, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();


            switch (action)
            {
              case "GetTask":
                    return new OkObjectResult(MainManager.Instance.taskManager.getAllCompetitiomTask(userid, competitionID));

                case "GetCategories":
                    return new OkObjectResult(MainManager.Instance.categoriesManager.allCategories());
                case "UpdateOneTask":
                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userid, competitionID))
                    {
                        Models.Task task = System.Text.Json.JsonSerializer.Deserialize<Models.Task>(requestBody);

                        MainManager.Instance.taskManager.UpdateOneTask(task);
                        return new OkObjectResult(true);

                    }
                    else
                    {
                       ; return new OkObjectResult(false);
                    };
                case "DeleteOneTask":
                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userid, competitionID))
                    {
                     //   string taskID = System.Text.Json.JsonSerializer.Deserialize<string>(requestBody);

                        MainManager.Instance.taskManager.DeleteTaskFromDB(competitionID, requestBody);
                        return new OkObjectResult(true);

                    }
                    else
                    {
                        return new OkObjectResult(false);
                    }

                default:
                    break;
            }
            return new NotFoundObjectResult("404 Not Found");
        }
    }
}