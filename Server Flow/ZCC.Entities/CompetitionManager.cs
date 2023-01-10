using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class CompetitionManager
    {
        private competitionDataSql competitionDataSql = new competitionDataSql();


        // ---------------------  remove all of the current managers from managing this competition ---------------------
        public void RemoveCompetitionManagers(string competitionID)
        {
            int competitionid = int.Parse(competitionID);
            competitionDataSql.RemoveCompetitionManager(competitionid);                         
        }

        // --------------------- Update specific Competition row ---------------------
        public bool UpdateCompetition(Competition competition) 
        {
            return competitionDataSql.UpdateCompetition(competition);
        }

        // --------------------- Create new competition ---------------------
        public void createCompetition(Competition competition, User[] users)
        {
            int newCompetitionID =  competitionDataSql.CreateNewCompetitions(competition);
            setManagers(users, newCompetitionID);
        }

        // --------------------- Set users as competition managers in a specific competition ---------------------
        public void setManagers(User[] users,int competitionID)
        {
            competitionDataSql.SetManagers(users, competitionID);   
        }

        // --------------------- Return all competition in the DB ---------------------
        public Dictionary<int ,Competition> allSystemCompetitions { get { return competitionDataSql.GetAllCompetitions(); } private set { } }


        // --------------------- Return all competition in the DB for a specific user ---------------------
        public Dictionary<int, Models.Competition> allUserCompetitions(string id)
        {
            return competitionDataSql.GetUserCompetitionsFromDB(id);
        }
        public Models.Competition UserCompetitionManaget(string id, string competitionidID)
        {
            return competitionDataSql.GetCompetitionByIdFromDB(id, competitionidID);
        }
        
    }
}
