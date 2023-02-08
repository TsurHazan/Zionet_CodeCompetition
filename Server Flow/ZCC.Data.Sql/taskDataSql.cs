using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.DAL;
using ZCC.Models;
using Task = ZCC.Models.Task;

namespace ZCC.Data.Sql
{
    public class taskDataSql : BaseDataSql
    {
        // --------------------- Participant choose task ---------------------
        public static string ChooseTask(string competitionID, string teamID, string taskID, string timeFrame)
        {
            string query = $"exec ChooseTask @TEAMID ={teamID} , @COMPETITIONID ={competitionID}, @TASKID ={taskID} ,@TIMEFRAME ={timeFrame}";

            SqlServerQuery.miisiksFunc func = _ChooseTask;
            if ((Task)DAL.SqlServerQuery.getValueFromDB(query, func) != null) { return "success"; }
            return "error";
        }

        private static Models.Task _ChooseTask(SqlDataReader reader)
        {
            Task task = new Models.Task();

            reader.Read();
            task.id = reader.GetInt32(0);
            task.CompetitionID = reader.GetInt32(1);
            task.CategoryID = reader.GetString(2);
            task.Timeframe = reader.GetInt32(3);
            task.points = reader.GetInt32(4);
            task.Description = reader.GetString(5);
            task.BonusPoints = reader.GetInt32(6);
            task.BonusTime = reader.GetInt32(7);
            task.name = reader.GetString(8);
            return task;
        }

        // --------------------- Get all the tasks left for a team ---------------------
        public static Dictionary<int, Task> GetAllAvailableTasksForTeam(string competitionID, string teamID)
        {
            string sqlQuery = $"exec SelectAvailableTasks @TEAMID={teamID},@COMPETITIONID={competitionID}";
            SqlServerQuery.miisiksFunc func = SetDataToDictionary;
            Dictionary<int, Models.Task> ret = (Dictionary<int, Models.Task>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
            return ret;
        }

        // --------------------- // ---------------------
        public static Dictionary<int, Models.Task> SetDataToDictionary(SqlDataReader reader)
        {
            Dictionary<int, Models.Task> taskDic = new Dictionary<int, Models.Task>();
            while (reader.Read())
            {
                Models.Task task = new Models.Task();
                task.id = reader.GetInt32(0);
                task.CompetitionID = reader.GetInt32(1);
                task.CategoryID = reader.GetString(2);
                task.Timeframe = reader.GetInt32(3);
                task.points = reader.GetInt32(4);
                task.Description = reader.GetString(5);
                task.BonusPoints = reader.GetInt32(6);
                task.BonusTime = reader.GetInt32(7);
                task.name = reader.GetString(8);

                taskDic.Add(task.id, task);
            }
            return taskDic;
        }

        public static Models.Task SetDataToObj(SqlDataReader reader)
        {
            if (reader.Read())
            {
                Models.Task task = new Models.Task();
                task.id = reader.GetInt32(0);
                task.CompetitionID = reader.GetInt32(1);
                task.CategoryID = reader.GetString(2);
                task.Timeframe = reader.GetInt32(3);
                task.points = reader.GetInt32(4);
                task.Description = reader.GetString(5);
                task.BonusPoints = reader.GetInt32(6);
                task.BonusTime = reader.GetInt32(7);
                task.name = reader.GetString(8);

                return task;
            }
            return null;
        }

        public static Dictionary<int, Models.Task> GetAllCompetitionTaskFromDB(string userID, string competitionID)
        {
            string sqlQuery = $"SELECT * FROM Tasks where CompetitionID = ( SELECT [Competition ID] FROM [Users competitions]  where UserID = '{userID}' and [Competition ID] = {competitionID} and Admin = 1)";
            SqlServerQuery.miisiksFunc func = SetDataToDictionary;
            Dictionary<int, Models.Task> ret = (Dictionary<int, Models.Task>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
            return ret;
        }

        public static void SetTaskToDB(Models.Task task)
        {
            string sqlQuery = $"insert into Tasks values ({task.CompetitionID},'{task.CategoryID}',{task.Timeframe},{task.points},'{task.Description}',{task.BonusPoints},{task.BonusTime},'{task.name}')";
            DAL.SqlServerQuery.runCommand(sqlQuery);
        }

        public static void UpdateOneTask(Models.Task task)
        {
            string sqlQuery = $"update Tasks set CategoryID = '{task.CategoryID}', [Timeframe(minutes)]= {task.Timeframe}, points = {task.points}, Description = '{task.Description}', [Bonus points] = {task.BonusPoints}, [Bonus Time(minutes)] = {task.BonusTime}, name = '{task.name}' where id = {task.id}";
            DAL.SqlServerQuery.runCommand(sqlQuery);
        }

        public static void DeleteTaskById(string competitionID, string taskID)
        {
            string sqlQuery = $"delete Tasks where id = {taskID}  and CompetitionID = {competitionID}";
            DAL.SqlServerQuery.runCommand(sqlQuery);
        }
    }
}