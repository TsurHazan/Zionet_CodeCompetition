using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class CompetitionManager : BaseEntity
    {
        private competitionDataSql competitionDataSql = new competitionDataSql();

        // --------------------- Change Competition Status ---------------------
        public void ChangeCompetitionStatus(string competitionID, string newStatus)
        {
            competitionDataSql.ChangeCompetitionStatus(int.Parse(competitionID), newStatus);
        }

        // --------------------- Update specific Competition row ---------------------
        public bool UpdateCompetition(Competition competition)
        {
            return competitionDataSql.UpdateCompetition(competition);
        }

        // --------------------- Create new competition ---------------------
        public int createCompetition(Competition competition)
        {
            return competitionDataSql.CreateNewCompetitions(competition);
        }

        // --------------------- Return all competition in the DB ---------------------
        public Dictionary<int, Competition> allSystemCompetitions
        { get { return competitionDataSql.GetAllCompetitions(); } private set { } }

        // --------------------- Return all competition in the DB for a specific user ---------------------
        public Dictionary<int, Models.Competition> allUserCompetitions(string id, int admin)
        {
            return competitionDataSql.GetUserCompetitionsFromDB(id, admin);
        }

        public Models.Competition UserCompetitionManager(string id, string competitionidID)
        {
            return competitionDataSql.GetCompetitionByIdFromDB(id, competitionidID);
        }
    }
}