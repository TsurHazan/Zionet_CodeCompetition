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
    public class competitionDataSql : BaseDataSql
    {
        private static SqlServerQuery.miisiksFunc func { get; set; }
        private static string query;
        private static Dictionary<int, Models.Competition> DiCompetitions = new Dictionary<int, Competition>();

        // --------------------- Change Competition Status  ---------------------
        public void ChangeCompetitionStatus(int competitionID, string newStatus)
        {
            try
            {
            SqlServerQuery.runCommand($"update [Competitions] set [status] = '{newStatus}' where [id] = {competitionID}");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Update specific Competition row ---------------------
        public bool UpdateCompetition(Competition competition)
        {
            try
            {
                string query = $"Update [Competitions] set [Start] = '{competition.Start.ToString("yyyy-MM-dd HH:mm:ss").Replace("/", "-")}',[End] = '{competition.End.ToString("yyyy-MM-dd HH:mm:ss").Replace("/", "-")}',[numOfTeams]={competition.numOfTeams},[status]='In Preparation',[Name]='{competition.Name}',[hashcode]='{competition.hashcode}',[max active Tasks]={competition.maxActiveTasks} where [id] = {competition.id}";
                bool? completed = (bool?)DAL.SqlServerQuery.getSingleValueFromDB(query);
                if (completed == null) { return false; }
                return (bool)completed;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- get all Competitions in general from DB ---------------------

        private static object _GetAllCompetitions(SqlDataReader reader)
        {
            try
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
                    competition.maxActiveTasks = reader.GetInt32(reader.GetOrdinal("max active Tasks"));

                    DiCompetitions.Add(competition.id, competition);
                }
                return DiCompetitions;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static Dictionary<int, Models.Competition> GetAllCompetitions()
        {
            try
            {
                func = _GetAllCompetitions;
                query = "SELECT * FROM [Competitions] WHERE [id] != 1 and [status] not like 'Deleted' ";
                Dictionary<int, Models.Competition> allCompetitions = (Dictionary<int, Models.Competition>)SqlServerQuery.getValueFromDB(query, func);
                return allCompetitions;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- create new competition in database and return its id ---------------------

        public static int CreateNewCompetitions(Competition competition)
        {
            try
            {
                string query = $"insert into Competitions ([Name],[Start],[End],numOfTeams,[status],hashcode,[max active Tasks]) values('{competition.Name}','{competition.Start.ToString("yyyy-MM-dd HH:mm:ss").Replace("/", "-")}','{competition.End.ToString("yyyy-MM-dd HH:mm:ss").Replace("/", "-")}',{competition.numOfTeams},'In Preparation','{competition.hashcode}',{competition.maxActiveTasks}) select COUNT(id) from Competitions";
                return (int)DAL.SqlServerQuery.getSingleValueFromDB(query);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- get all Competitions the user participating\managing at ---------------------
        public static Dictionary<int, Models.Competition> GetUserCompetitionsFromDB(string userID, int admin)
        {
            try
            {
                string sqlQuery = $"select  id ,Start,[End], numOfTeams, status,Name , hashcode,[max active Tasks] from [Users competitions] us join Competitions com on us.[Competition ID] = com.id where UserID = '{userID}' and [Admin] = {admin} and (status = 'In Preparation' or status = 'Running')";
                SqlServerQuery.miisiksFunc func = SetDataToDictionary;
                Dictionary<int, Models.Competition> ret = (Dictionary<int, Models.Competition>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
                return ret;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private static Dictionary<int, Models.Competition> SetDataToDictionary(SqlDataReader reader)
        {
            try
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
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Get a specific competition the user is related to ---------------------
        public static Models.Competition SetDataToCompetition(SqlDataReader reader)
        {
            try
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
            catch (Exception ex)
            {
                throw;
            }
        }

        public static Models.Competition GetCompetitionByIdFromDB(string userID, string competitionID)
        {
            try
            {
                string sqlQuery = $"select  id ,Start,[End], numOfTeams, status,Name , hashcode,[max active Tasks] from [Users competitions] us join Competitions com on us.[Competition ID] = com.id where UserID = '{userID}' and [Competition ID] = {competitionID} and [Admin] = 1";
                SqlServerQuery.miisiksFunc func = SetDataToCompetition;
                Models.Competition ret = (Models.Competition)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
                return ret;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}