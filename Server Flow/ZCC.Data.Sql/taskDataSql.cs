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
    public class taskDataSql
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
                task.CategoryID = reader.GetInt32(2);
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

        public static Dictionary<int, Models.Task> GetAllCompetitionTaskFromDB(string userID,string competitionID)
        {
            string sqlQuery = $"SELECT * FROM Tasks where CompetitionID = ( SELECT [Competition ID] FROM [Users competitions]  where UserID = '{userID}' and [Competition ID] = {competitionID})";
             func = SetDataToDictionary;
            Dictionary<int, Models.Task> ret = (Dictionary<int, Models.Task>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
            return ret;
        }
    }
}
