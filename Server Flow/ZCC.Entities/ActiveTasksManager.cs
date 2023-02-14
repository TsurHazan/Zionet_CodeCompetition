﻿using System.Collections.Generic;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class ActiveTasksManager
    {

        public Dictionary<int, Models.ActiveTasks> GetSubmittedTasks(string competitionID)
        {
            return ActiveTasksDataSql.GetSubmittedActiveTasks(competitionID);
        }
        public string UpdateTaskStatusToDone(string activeTaskID,string enterPoint)
        {
            return ActiveTasksDataSql.UpdateSubmittedTaskStatus(activeTaskID, enterPoint);
        }



    }
}