using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.DAL;
using ZCC.Models;

namespace ZCC.Data.Sql
{
    public class taskDataSql : BaseDataSql
    {
        private static SqlServerQuery.miisiksFunc func { get; set; }

        public static Dictionary<int, Models.Task> taskDic = new Dictionary<int, Models.Task>();

        public static Dictionary<int, Models.Task> SetDataToDictionary(SqlDataReader reader)
        {
            taskDic.Clear();
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
            func = SetDataToDictionary;
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