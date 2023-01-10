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
    public class userDataSql
    {
        private SqlServerQuery.miisiksFunc func { get; set; }
        private string query { get; set; }


        // --------------------- get all Competitions Managers from the DB ---------------------
        public Dictionary<string, User> getAllCompetitonManagers(string competitionID) {
            func = _getAllCompetitonManagers;
            query = $"select * from [dbo].[Users competitions] where [Competition ID] = {competitionID} and [Admin] = 1";
            return (Dictionary<string, User>)SqlServerQuery.getValueFromDB(query, func);
        }
        private object _getAllCompetitonManagers(SqlDataReader reader)
        {
            Dictionary<string, User> allUsers = new Dictionary<string, User>();
            while (reader.Read())
            {
                User user = new User(reader.GetString(reader.GetOrdinal("id")), reader.GetString(reader.GetOrdinal("name")), reader.GetString(reader.GetOrdinal("Email")));
                allUsers.Add(user.user_id, user);
            }
            return allUsers;
        }

        // --------------------- checking if user is a manager of the competition given ---------------------
        public bool checkIfUserIsCompetitionManager(string UserID, string CompetitionID)
        {
            
            query = $"select [admin] from [dbo].[Users competitions] where ([Competition ID] = {CompetitionID} and [UserID] = '{UserID}')";
            if ((bool?)SqlServerQuery.getSingleValueFromDB(query) == null) return false;
            return true;
        }

        // --------------------- inser a user to the DB  ---------------------
        public void insertUserToDB(User newUser)
        {
            query = $"insert into Users (id,name,Email) Values('{newUser.user_id}','{newUser.name}','{newUser.email}')";
            SqlServerQuery.runCommand(query);
        }

        // --------------------- check if user exist in the Database or not ---------------------
        private object _checkIfUserInDB(SqlDataReader reader)
        {
            //if he exist then true, else=false
            bool state = reader.Read();
            return state;
        }

        public bool checkIfUserInDB(string userID)
        {
            func = _checkIfUserInDB;
            query = $"select * from Users where Users.id like '{userID}'";
            bool exist = (bool)SqlServerQuery.getValueFromDB(query, func);
            if (!exist) { return false; }
            return true;
        }
        

        // --------------------- get all users on the DB ---------------------
        private object _getAllUsers(SqlDataReader reader)
        {
            Dictionary<string, User> allUsers = new Dictionary<string, User>();

            while (reader.Read())
            {
                User user = new User(reader.GetString(reader.GetOrdinal("id")), reader.GetString(reader.GetOrdinal("name")), reader.GetString(reader.GetOrdinal("Email")));
                allUsers.Add(user.user_id, user);
            }
            return allUsers;
        }

        public Dictionary<string, User> getAllUsers()
        {
            func = _getAllUsers;
            query = "select * from Users";
            Dictionary<string, User> allUsers = (Dictionary<string, User>)SqlServerQuery.getValueFromDB(query, func);
            return allUsers;
        }
        
    }
}