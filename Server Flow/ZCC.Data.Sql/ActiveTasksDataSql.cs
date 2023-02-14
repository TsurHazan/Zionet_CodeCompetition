using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using ZCC.DAL;
using ZCC.Models;

namespace ZCC.Data.Sql
{
    public class ActiveTasksDataSql
    {
        // --------------------- Get single active task  ---------------------

        public static ActiveTasks GetActiveTask(string taskID)
        {
            try
            {
                string query = $"select * from [Active Tasks] where id = {taskID}";
                SqlServerQuery.miisiksFunc func = _GetActiveTask;
                return (ActiveTasks)SqlServerQuery.getValueFromDB(query, func);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static ActiveTasks _GetActiveTask(SqlDataReader reader)
        {
            try
            {
                reader.Read();

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
                return activeTask;
            }
            catch (Exception)
            {
                throw;
            }
        }

        // --------------------- Get team task history ---------------------

        public static Dictionary<int, ActiveTasks> TeamTasksHistory(string teamID)
        {
            string query = $"select * from [Active Tasks] where teamID = {teamID}";
            SqlServerQuery.miisiksFunc func = _GetActiveTasksDictionary;
            try
            {
                return (Dictionary<int, ActiveTasks>)SqlServerQuery.getValueFromDB(query, func);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static Dictionary<int, ActiveTasks> GetSubmittedActiveTasks(string competitionID)
        {
            SqlServerQuery.miisiksFunc func = _GetActiveTasksDictionary;
            string query = $"select * from [Active Tasks] where status = 'Submitted' and competitionID = {competitionID}";
            return (Dictionary<int, ActiveTasks>)SqlServerQuery.getValueFromDB(query, func);
        }

        private static Dictionary<int, ActiveTasks> _GetActiveTasksDictionary(SqlDataReader reader)
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

        public static string UpdateSubmittedTaskStatus(string activeTaskID)
        {
            string query = $"update [Active Tasks] set Status = 'Done' where id = {activeTaskID}  select Status from [Active Tasks] where id = {activeTaskID}";
            string currentStatus = (string)SqlServerQuery.getSingleValueFromDB(query);
            return currentStatus;
        }
    }
}