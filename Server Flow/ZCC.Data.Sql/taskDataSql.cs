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
            try
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
            catch (Exception ex)
            {
                throw;
            }
        }

        public static Models.Task SetDataToObj(SqlDataReader reader)
        {
            try
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
            catch (Exception ex)
            {
                throw;
            }
        }

        public static Dictionary<int, Models.Task> GetAllCompetitionTaskFromDB(string userID, string competitionID)
        {
            try
            {
                string sqlQuery = $"SELECT * FROM Tasks where CompetitionID = ( SELECT [Competition ID] FROM [Users competitions]  where UserID = '{userID}' and [Competition ID] = {competitionID} and Admin = 1)";
                func = SetDataToDictionary;
                Dictionary<int, Models.Task> ret = (Dictionary<int, Models.Task>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
                return ret;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static void SetTaskToDB(Models.Task task)
        {
            try
            {
                string sqlQuery = $"insert into Tasks values ({task.CompetitionID},'{task.CategoryID}',{task.Timeframe},{task.points},'{task.Description}',{task.BonusPoints},{task.BonusTime},'{task.name}')";
                DAL.SqlServerQuery.runCommand(sqlQuery);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static void UpdateOneTask(Models.Task task)
        {
            try
            {
                string sqlQuery = $"update Tasks set CategoryID = '{task.CategoryID}', [Timeframe(minutes)]= {task.Timeframe}, points = {task.points}, Description = '{task.Description}', [Bonus points] = {task.BonusPoints}, [Bonus Time(minutes)] = {task.BonusTime}, name = '{task.name}' where id = {task.id}";
                DAL.SqlServerQuery.runCommand(sqlQuery);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static void DeleteTaskById(string competitionID, string taskID)
        {
            try
            {
                string sqlQuery = $"delete Tasks where id = {taskID}  and CompetitionID = {competitionID}";
                DAL.SqlServerQuery.runCommand(sqlQuery);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static string DuplicationTask(Models.Task task)
        {
            try
            {
                string Query = $"insert into Tasks  (CompetitionID, [CategoryID],[Timeframe(minutes)],[points],[Description],[Bonus points] ,[Bonus Time(minutes)] ,[name])   select CompetitionID ,[CategoryID],[Timeframe(minutes)],[points],[Description],[Bonus points],[Bonus Time(minutes)] ,(select distinct [name] =  name+ (select CAST(count(name) as nvarchar)  from Tasks where name like ('{task.name}%') ) from Tasks where name =('{task.name}')) from [Tasks] where id = {task.id} select 'Successfully' ";
                string answer = (string)DAL.SqlServerQuery.getSingleValueFromDB(Query);
            
                return answer;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}