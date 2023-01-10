using Newtonsoft.Json;
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
    public class competitionDataSql
    {
        private static SqlServerQuery.miisiksFunc func { get; set; }
        private static string query;
        static Dictionary<int, Models.Competition> DiCompetitions = new Dictionary<int, Competition>();


        // --------------------- Remove user from being manager in a specific Competition  ---------------------
        public void RemoveCompetitionManager(int competitionID)
        {
            string query = $"update [Users competitions] set [Admin] = 0 where [Competition ID] = {competitionID}";
            SqlServerQuery.runCommand(query);
        }

        // --------------------- Update specific Competition row ---------------------
        public bool UpdateCompetition(Competition competition)
        {
            string query = $"Update [Competitions] set [Start] = '{competition.Start.ToString("yyyy-MM-dd HH:mm:ss").Replace("/", "-")}',[End] = '{competition.End.ToString("yyyy-MM-dd HH:mm:ss").Replace("/", "-")}',[numOfTeams]={competition.numOfTeams},[status]='{competition.status}',[Name]='{competition.Name}',[hashcode]='{competition.hashcode}',[max active Tasks]={competition.maxActiveTasks} where [id] = {competition.id}";
            bool? completed = (bool?)DAL.SqlServerQuery.getSingleValueFromDB(query);
            if (completed == null) { return false; }
            return (bool)completed;
        }

        // --------------------- get all Competitions in general from DB ---------------------

        private static object _GetAllCompetitions(SqlDataReader reader)
        {
            DiCompetitions.Clear();

            while (reader.Read())
            {
                Competition competition = new Competition();
                competition.id = reader.GetInt32(reader.GetOrdinal("id"));
                competition.Start = reader.GetDateTime(reader.GetOrdinal("Start"));
                competition.End = reader.GetDateTime(reader.GetOrdinal("End"));
                competition.Name = reader.GetString(reader.GetOrdinal("Name"));
                competition.hashcode = reader.GetString(reader.GetOrdinal("hashcode"));
                competition.status = reader.GetString(reader.GetOrdinal("status"));
                competition.numOfTeams = reader.GetInt32(reader.GetOrdinal("numOfTeams"));
                competition.maxActiveTasks= reader.GetInt32(reader.GetOrdinal("max active Tasks"));
                    
                DiCompetitions.Add(competition.id, competition);

            }
            return DiCompetitions;
        }


        public static Dictionary<int, Models.Competition> GetAllCompetitions()
        {
            func = _GetAllCompetitions;
            query = "SELECT * FROM Competitions WHERE id != 1";
            Dictionary<int, Models.Competition> allCompetitions = (Dictionary<int, Models.Competition>)SqlServerQuery.getValueFromDB(query, func);
            return allCompetitions;
        }

        // --------------------- create new competition in database ---------------------

        public static int CreateNewCompetitions(Competition competition)
        {
            string query = $"insert into Competitions ([Name],[Start],[End],numOfTeams,[status],hashcode,[max active Tasks]) values('{competition.Name}','{competition.Start.ToString("yyyy-MM-dd HH:mm:ss").Replace("/", "-")}','{competition.End.ToString("yyyy-MM-dd HH:mm:ss").Replace("/", "-")}',{competition.numOfTeams},'In Preparation','{competition.hashcode}',{competition.maxActiveTasks}) select COUNT(id) from Competitions";
            return (int) DAL.SqlServerQuery.getSingleValueFromDB(query);
            
        }

        // --------------------- set a competition managers ---------------------

        public static void SetManagers(User[] users,int competitionID)
        {
            foreach (User user in users)
            {
                string query = $"insert into [Users competitions] values ('{user.user_id}',1,1,{competitionID})";
                SqlServerQuery.runCommand(query);
            }         
        }

        // --------------------- ??? ---------------------

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


        // --------------------- get all Competitions the user participating at ---------------------

        public static Dictionary<int, Models.Competition> GetUserCompetitionsFromDB(string userID)
        {
            string sqlQuery = $"select  id ,Start,[End], numOfTeams, status,Name , hashcode,[max active Tasks] from [Users competitions] us join Competitions com on us.[Competition ID] = com.id where UserID = '{userID}' and [Admin] = 1";
            SqlServerQuery.miisiksFunc func = SetDataToDictionary;
            Dictionary<int, Models.Competition> ret = (Dictionary<int, Models.Competition>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
            return ret;
        }

        public static Models.Competition SetDataToCompetition(SqlDataReader reader)
        {
            if (reader.Read())
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
                 return competition;
            }
            return null;
        }

        public static Models.Competition GetCompetitionByIdFromDB(string userID, string competitionID)
        {
            string sqlQuery = $"select  id ,Start,[End], numOfTeams, status,Name , hashcode,[max active Tasks] from [Users competitions] us join Competitions com on us.[Competition ID] = com.id where UserID = '{userID}' and [Competition ID] = {competitionID} and [Admin] = 1";
            SqlServerQuery.miisiksFunc func = SetDataToCompetition;
             Models.Competition ret = ( Models.Competition)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
            return ret;
        }
    }
}
