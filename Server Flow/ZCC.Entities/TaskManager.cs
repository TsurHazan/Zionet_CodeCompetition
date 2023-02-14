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
        // --------------------- Get single task ---------------------

        public Models.Task GetSingleTask(string activeTaskID, string teamID)
        {
            try
            {
                return taskDataSql.GetSingleTask(activeTaskID, teamID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // --------------------- Participant choose task ---------------------

        public object ChooseTask(string competitionID, string teamID, string taskID, string timeFrame)
        {
            try
            {
                return taskDataSql.ChooseTask(competitionID, teamID, taskID, timeFrame);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // --------------------- Get all the tasks left for a team ---------------------

        public Dictionary<int, Task> GetAllAvailableTasksForTeam(string teamId, string competitionID)
        {
            try
            {
                return taskDataSql.GetAllAvailableTasksForTeam(competitionID, teamId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // ---------------------  ---------------------

        public Dictionary<int, Models.Task> getAllCompetitionTask(string userId, string competitionID)
        {
            try
            {
                return (Dictionary<int, Models.Task>)taskDataSql.GetAllCompetitionTaskFromDB(userId, competitionID);
            }
            catch (Exception)
            {
                throw;
            }
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

        public string DuplicationTaskById(Models.Task task) 
        {
            return taskDataSql.DuplicationTask(task);
        }
    }
}