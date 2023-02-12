using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class TaskManager : BaseEntity
    {
        // --------------------- Participant choose task ---------------------

        public object ChooseTask(string competitionID, string teamID, string taskID, string timeFrame)
        {
            return taskDataSql.ChooseTask(competitionID, teamID, taskID, timeFrame);
        }

        // --------------------- Get all the tasks left for a team ---------------------

        public Dictionary<int, Task> GetAllAvailableTasksForTeam(string teamId, string competitionID)
        {
            return taskDataSql.GetAllAvailableTasksForTeam(competitionID, teamId);
        }

        // ---------------------  ---------------------

        public Dictionary<int, Models.Task> getAllCompetitionTask(string userId, string competitionID)
        {
            return (Dictionary<int, Models.Task>)taskDataSql.GetAllCompetitionTaskFromDB(userId, competitionID);
        }

        public void setNewTask(Models.Task task)
        {
            taskDataSql.SetTaskToDB(task);
        }

        public void UpdateOneTask(Models.Task task)
        {
            taskDataSql.UpdateOneTask(task);
        }

        public void DeleteTaskFromDB(string competitionID, string taskID)
        {
            taskDataSql.DeleteTaskById(competitionID, taskID);
        }
    }
}