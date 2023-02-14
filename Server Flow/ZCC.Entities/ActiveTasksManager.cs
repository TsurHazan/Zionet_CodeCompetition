using System;
using System.Collections.Generic;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class ActiveTasksManager
    {
        // --------------------- Get single active task  ---------------------

        public ActiveTasks GetActiveTask(string taskID)
        {
            try
            {
                return ActiveTasksDataSql.GetActiveTask(taskID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // --------------------- Get team task history ---------------------

        public Dictionary<int, Models.ActiveTasks> TeamTasksHistory(string teamID)
        {
            try
            {
                return ActiveTasksDataSql.TeamTasksHistory(teamID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Dictionary<int, Models.ActiveTasks> GetSubmittedTasks(string competitionID)
        {
            return ActiveTasksDataSql.GetSubmittedActiveTasks(competitionID);
        }

        public string UpdateTaskStatusToDone(string activeTaskID)
        {
            return ActiveTasksDataSql.UpdateSubmittedTaskStatus(activeTaskID);
        }
    }
}