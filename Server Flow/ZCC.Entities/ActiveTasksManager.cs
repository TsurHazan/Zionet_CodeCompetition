using System;
using System.Collections.Generic;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class ActiveTasksManager
    {

        public Dictionary<int, Models.ActiveTasks> GetSubmittedTasks(string competitionID)
        {
            try
            {
                return ActiveTasksDataSql.GetSubmittedActiveTasks(competitionID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public string UpdateTaskStatusToDone(string activeTaskID,string enterPoint)
        {
            try
            {
                return ActiveTasksDataSql.UpdateSubmittedTaskStatus(activeTaskID, enterPoint);
            }
            catch (Exception ex)
            {
                throw;
            }
        }



    }
}