using System;
using System.Collections.Generic;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class ActiveTasksManager
    {
        // --------------------- Add members as task participants  ---------------------

        public string AddMembersAsTaskParticipants(Dictionary<string, User> teamMembers, int activetaskID)
        {
            try
            {
                return ActiveTasksDataSql.AddMembersAsTaskParticipants(teamMembers, activetaskID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // --------------------- Submit solved task by participant  ---------------------

        public string SubmitSolvedTask(ActiveTasks solvedTask)
        {
            try
            {
                return ActiveTasksDataSql.SubmitSolvedTask(solvedTask);
            }
            catch (Exception)
            {
                throw;
            }
        }

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