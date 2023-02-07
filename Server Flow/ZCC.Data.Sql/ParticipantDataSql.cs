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
    public class ParticipantDataSql
    {
        private static string query { get; set; }
        private static SqlServerQuery.miisiksFunc func { get; set; }

        // --------------------- Search for user team in Running competition ---------------------
        public static string FindParticipantTeam(string participantId, string competitionID)
        {
            query = $"select T.id from Teams as T\r\ninner join [Users competitions] as Uc on Uc.[TeamID] = T.id\r\ninner join [Competitions] as C on C.id = Uc.[Competition ID]\r\nwhere uc.UserID = '{participantId}' and C.status like 'Running' and C.id = {competitionID}";
            object answer = SqlServerQuery.getSingleValueFromDB(query);
            return answer.ToString();
        }

        // --------------------- Check if participant is in a team ---------------------
        public static bool checkIfParticipantIsInTeam(string UserID, string CompetitionID, string TeamID)
        {
            query = $"  select userComp.TeamID from [Competitions] as comp\r\n  inner join [Users competitions] as userComp on userComp.[Competition ID] = comp.id\r\n  where userComp.UserID = '{UserID}' and userComp.[Competition ID] = {CompetitionID} and userComp.TeamID = {TeamID}";
            if ((bool?)SqlServerQuery.getSingleValueFromDB(query) == null) return false;
            return true;
        }
    }
}