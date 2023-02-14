using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class userManager : BaseEntity
    {
        private userDataSql UserDataSQL = new userDataSql(); //init userDataSql

        // --------------------- Search for user team in Running competition ---------------------
        public string FindParticipantTeam(string participantId, string competitionID)
        {
            return UserDataSQL.FindParticipantTeam(participantId, competitionID);
        }

        // --------------------- Check if participant is in a team ---------------------
        public bool checkIfParticipantIsInTeam(string UserID, string CompetitionID, string TeamID)
        {
            return UserDataSQL.checkIfParticipantIsInTeam(UserID, CompetitionID, TeamID);
        }

        // --------------------- Set users as competition managers in a specific competition ---------------------
        public void setManagers(User[] users, int competitionID)
        {
            try
            {
                UserDataSQL.SetManagers(users, competitionID);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        // ---------------------  remove all of the current managers from managing this competition ---------------------
        public void RemoveCompetitionManagers(string competitionID, string userID)
        {
            try
            {
                UserDataSQL.RemoveCompetitionManager(competitionID, userID);
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
               return UserDataSQL.getAllCompetitonManagers(competitionID); 

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- check if user exist in the Database or not ---------------------
        public bool checkIfUserInDB(string userID)
        {
            try
            {
                return UserDataSQL.checkIfUserInDB(userID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- checking if user is a manager of the competition given ---------------------
        public bool checkIfUserIsCompetitionManager(string userID, string competitionID)
        {
            try
            {
                return UserDataSQL.checkIfUserIsCompetitionManager(userID, competitionID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- inser a user to the DB  ---------------------
        public void insertUserToDB(User user)
        {
            try
            {
                UserDataSQL.insertUserToDB(user);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- get all users on the DB ---------------------
        public Dictionary<string, User> allUsers
        { get 
            {
                try
                {
                    return UserDataSQL.getAllUsers(); 
                }
                catch (Exception ex)
                {
                    throw;
                }
            } 
        }
    }
}