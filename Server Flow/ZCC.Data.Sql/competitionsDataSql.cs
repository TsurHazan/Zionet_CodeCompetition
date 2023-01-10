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
    public class competitionsDataSql
    {
        static Dictionary<int, Models.Competition>  DiCompetitions = new Dictionary<int, Competition>();

        public static Dictionary<int, Models.Competition> SetDataToDictionary(SqlDataReader reader)
        {
            DiCompetitions.Clear();
            while (reader.Read())
                {
                Models.Competition competition = new Models.Competition();
                competition.id = reader.GetInt32(0);
                competition.Start = reader.GetDateTime(1);
                competition.End = reader.GetDateTime(2);
                competition.numOfTeams = reader.GetInt32(3);
                competition.status = reader.GetString(4);
                competition.Name = reader.GetString(5);
                competition.hashcode = reader.GetString(6);
                competition.maxActiveTasks = reader.GetInt32(7);
                DiCompetitions[competition.id] = competition;
            }
            return DiCompetitions;
        }

        public static Dictionary<int, Models.Competition> GetUserCompetitionsFromDB(string userID)
        {
            string sqlQuery = $"select  id ,Start,[End], numOfTeams, status,Name , hashcode,[max active Tasks] from [Users competitions] us join Competitions com on us.[Competition ID] = com.id where UserID = '{userID}' and [Admin] = 1";
            SqlServerQuery.miisiksFunc func = SetDataToDictionary;
            Dictionary<int, Models.Competition> ret = (Dictionary<int, Models.Competition>)DAL.SqlServerQuery.getValueFromDB(sqlQuery,func);
            return ret;
        }
    }
}
