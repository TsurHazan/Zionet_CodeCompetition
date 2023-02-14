using System;
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
    public class userDataSql : BaseDataSql
    {
        private SqlServerQuery.miisiksFunc func { get; set; }
        private string query { get; set; }

        // --------------------- set a competition managers ,if user is not related to the competition then insert him as manager ---------------------

        public void SetManagers(User[] users, int competitionID)
        {
            try
            {
                foreach (User user in users)
                {
                    string query = $"IF exists(select * from [Users competitions] where ([UserID] =  '{user.user_id}' and [Competition ID] = {competitionID}))\r\nbegin\r\nupdate [Users competitions] set [Admin] = 1 where [UserID] = '{user.user_id}' and [Competition ID] = {competitionID}\r\nend\r\nELSE\r\nbegin\r\ninsert into [Users competitions] values ('{user.user_id}',1,1,{competitionID})\r\nend";
                    SqlServerQuery.runCommand(query);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Remove user from being manager in a specific Competition and from the competition  ---------------------
        public void RemoveCompetitionManager(string competitionID, string userID)
        {
            try
            {
                string query = $"update [Users competitions] set [Admin] = 0,[Competition ID]= 1 where [Competition ID] = {competitionID}";
                SqlServerQuery.runCommand(query);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- get all Competitions Managers from the DB ---------------------
        public Dictionary<string, User> getAllCompetitonManagers(string competitionID)
        {
            try
            {
                func = _getAllCompetitonManagers;
                query = $"select [Users].* from [dbo].[Users competitions] inner join [Users] on [Users].id = [Users competitions].UserID where [Competition ID] = {competitionID} and [Admin] = 1";
                return (Dictionary<string, User>)SqlServerQuery.getValueFromDB(query, func);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private object _getAllCompetitonManagers(SqlDataReader reader)
        {
            try
            {
                Dictionary<string, User> allUsers = new Dictionary<string, User>();
                while (reader.Read())
                {
                    User user = new User(reader.GetString(reader.GetOrdinal("id")), reader.GetString(reader.GetOrdinal("name")), reader.GetString(reader.GetOrdinal("Email")));
                    allUsers.Add(user.user_id, user);
                }
                return allUsers;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- checking if user is a manager of the competition given ---------------------
        public bool checkIfUserIsCompetitionManager(string UserID, string CompetitionID)
        {
            try
            {
                query = $"select [admin] from [dbo].[Users competitions] where ([Competition ID] = {CompetitionID} and [UserID] = '{UserID}')";
                if ((bool?)SqlServerQuery.getSingleValueFromDB(query) == null) return false;
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- inser a user to the DB  ---------------------
        public void insertUserToDB(User newUser)
        {
            try
            {
                query = $"insert into Users (id,name,Email) Values('{newUser.user_id}','{newUser.name}','{newUser.email}')";
                SqlServerQuery.runCommand(query);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- check if user exist in the Database or not ---------------------
        private object _checkIfUserInDB(SqlDataReader reader)
        {
            try
            {
                //if he exist then true, else=false
                bool state = reader.Read();
                return state;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public bool checkIfUserInDB(string userID)
        {
            try
            {
                func = _checkIfUserInDB;
                query = $"select * from Users where Users.id like '{userID}'";
                bool exist = (bool)SqlServerQuery.getValueFromDB(query, func);
                if (!exist) { return false; }
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- get all users on the DB ---------------------
        private object _getAllUsers(SqlDataReader reader)
        {
            try
            {
                Dictionary<string, User> allUsers = new Dictionary<string, User>();

                while (reader.Read())
                {
                    User user = new User(reader.GetString(reader.GetOrdinal("id")), reader.GetString(reader.GetOrdinal("name")), reader.GetString(reader.GetOrdinal("Email")));
                    allUsers.Add(user.user_id, user);
                }
                return allUsers;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Dictionary<string, User> getAllUsers()
        {
            try
            {
                func = _getAllUsers;
                query = "select * from Users";
                Dictionary<string, User> allUsers = (Dictionary<string, User>)SqlServerQuery.getValueFromDB(query, func);
                return allUsers;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}