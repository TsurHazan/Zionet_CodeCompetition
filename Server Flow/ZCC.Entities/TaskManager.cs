using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;

namespace ZCC.Entities
{
    public class TaskManager : BaseEntity
    {
        public Dictionary<int, Models.Task> getAllCompetitiomTask(string userId, string competitionID)
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