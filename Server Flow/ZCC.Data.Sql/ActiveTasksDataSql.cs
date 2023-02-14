using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.DAL;
using ZCC.Models;

namespace ZCC.Data.Sql
{
    public class ActiveTasksDataSql
    {
        private static SqlServerQuery.miisiksFunc func { get; set; }
        private static string query { get; set; }

        public static Dictionary<int, ActiveTasks> GetSubmittedActiveTasks(string competitionID)
        {
            try
            {
                func = _GetSubmittedActiveTasks;
                query = $"select * from [Active Tasks] where status = 'Submitted' and competitionID = {competitionID}";
                return (Dictionary<int, ActiveTasks>)SqlServerQuery.getValueFromDB(query, func);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private static Dictionary<int, ActiveTasks> _GetSubmittedActiveTasks(SqlDataReader reader)
        {
            try
            {
                Dictionary<int, ActiveTasks> activeTaskDic = new Dictionary<int, ActiveTasks>();

                while (reader.Read())
                {

                    ActiveTasks activeTask = new ActiveTasks();
                    activeTask.id = reader.GetInt32(reader.GetOrdinal("id"));
                    activeTask.teamID = reader.GetInt32(reader.GetOrdinal("teamID"));
                    activeTask.competitionID = reader.GetInt32(reader.GetOrdinal("competitionID"));
                    activeTask.taskID = reader.GetInt32(reader.GetOrdinal("taskID"));
                    activeTask.startTime = reader.GetDateTime(reader.GetOrdinal("start time"));
                    activeTask.endTime = reader.GetDateTime(reader.GetOrdinal("end time"));
                    activeTask.submitTime = reader.GetDateTime(reader.GetOrdinal("submit time"));
                    activeTask.Status = reader.GetString(reader.GetOrdinal("Status"));
                    activeTask.bonus = reader.GetBoolean(reader.GetOrdinal("bonus"));
                    activeTask.gitRepo = reader.GetString(reader.GetOrdinal("git repo"));
                    activeTaskDic.Add(activeTask.id, activeTask);
                }
                return activeTaskDic;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static string UpdateSubmittedTaskStatus(string activeTaskID ,string enterPoint)
        {
            try
            {
                query = $"update [Active Tasks] set Status = 'Done ({enterPoint} Points)' where id = {activeTaskID}  select Status from [Active Tasks] where id = {activeTaskID}";
                string currentStatus = (string)SqlServerQuery.getSingleValueFromDB(query);
                return currentStatus;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}

