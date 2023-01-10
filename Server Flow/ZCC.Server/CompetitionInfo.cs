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
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "Competition/{action}/{id?}")] HttpRequest req,
           string action, string id, ILogger log)
        {


            log.LogInformation("C# HTTP trigger function processed a request.");



            switch (action)
            {
                case "Add":
                    
                    break;
                case "Remove":

                    break;
                case "Update":
                    break;
               


                case "GetCategories":
                    return new OkObjectResult(MainManager.Instance.categoriesManager.allCategories());
                default:
                    break;
            }
            return new OkObjectResult("null");
        }
    }
}