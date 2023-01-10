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

namespace ZCC.Server
{
    public static class UsersCompetitions
    {
        [FunctionName("UsersCompetitions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", "update", "delete", Route = "UsersCompetitions/{action}/{userid}/{competitionID?}")] HttpRequest req, string competitionID,
           string action, string userid, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");


            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

            switch (action)
            {
                case "Add":

                    break;

                case "Remove":

                    break;

                case "Update":

                    break;

                case "EnableCompetition":

                    //check if the request sent by
                    if (MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userid, competitionID))
                    {
                        //update competition
                        return new OkObjectResult(true);
                    }

                    break;
                case "GetAllCompetition":
                    
                    return new OkObjectResult(MainManager.Instance.competitionsManager.allUserCompetitions(userid));
                case "GetCompetition":

                    return new OkObjectResult(MainManager.Instance.competitionsManager.UserCompetitionManaget(userid,competitionID));

                 
                default:
                    break;
            }
            return new OkObjectResult("null");
        }
    }
}