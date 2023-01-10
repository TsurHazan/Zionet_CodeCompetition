﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class userManager
    {
        private userDataSql UserDataSQL = new userDataSql(); //init userDataSql


        // --------------------- get all Competitions Managers from the DB ---------------------
        public Dictionary<string, User> getAllCompetitonManagers(string competitionID) { return UserDataSQL.getAllCompetitonManagers(competitionID); }


        // --------------------- check if user exist in the Database or not ---------------------
        public bool checkIfUserInDB(string userID)
        {
            return UserDataSQL.checkIfUserInDB(userID);
        }


        // --------------------- checking if user is a manager of the competition given ---------------------
        public bool checkIfUserIsCompetitionManager(string userID, string competitionID)
        {
            return UserDataSQL.checkIfUserIsCompetitionManager(userID, competitionID);
        }


        // --------------------- inser a user to the DB  ---------------------
        public void insertUserToDB(User user)
        {
            UserDataSQL.insertUserToDB(user);
        }


        // --------------------- get all users on the DB ---------------------
        public Dictionary<string, User> allUsers
        { get { return UserDataSQL.getAllUsers(); } }
    }
}