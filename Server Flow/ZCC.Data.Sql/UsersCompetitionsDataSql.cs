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
    public class UsersCompetitionsDataSql
    {
        private static SqlServerQuery.miisiksFunc func { get; set; }
        private static string query { get; set; }



        public static Dictionary<int, UsersCompetitions> UsersCompetitionsDic = new Dictionary<int, UsersCompetitions>();

        ///////////////////////////
        public static Dictionary<int, UsersCompetitions> GetAllParticipantCompetitions(string UserID)
        {
            func = _GetAllParticipantCompetitions;
            query = $"select * from [Users competitions] where UserID = '{UserID}' and Admin = 0";
            return (Dictionary<int, UsersCompetitions>)SqlServerQuery.getValueFromDB(query, func);
        }

        public static Dictionary<int, UsersCompetitions> _GetAllParticipantCompetitions(SqlDataReader reader)
        {
            UsersCompetitionsDic.Clear();
            while (reader.Read())
            {
            UsersCompetitions usersCompetitions = new UsersCompetitions();
                usersCompetitions.UserID = reader.GetString(0);
                usersCompetitions.Admin = reader.GetBoolean(1);
                usersCompetitions.TeamID= reader.GetInt32(2);
                usersCompetitions.CompetitionID = reader.GetInt32(3);
          


                UsersCompetitionsDic.Add(usersCompetitions.CompetitionID, usersCompetitions);

            }
            return UsersCompetitionsDic;
        }


    }
}
