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
            try
            {
                competitionDataSql.ChangeCompetitionStatus(int.Parse(competitionID), newStatus);
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
                return competitionDataSql.UpdateCompetition(competition);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Create new competition ---------------------
        public int createCompetition(Competition competition)
        {
            try
            {
                return competitionDataSql.CreateNewCompetitions(competition);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Return all competition in the DB ---------------------
        public Dictionary<int, Competition> allSystemCompetitions
        { get 
            {
                try
                {
                    return competitionDataSql.GetAllCompetitions(); 
                }
                catch (Exception ex)
                {
                    throw;
                }
            } private set { } }

        // --------------------- Return all competition in the DB for a specific user ---------------------
        public Dictionary<int, Models.Competition> allUserCompetitions(string id, int admin)
        {
            try
            {
                return competitionDataSql.GetUserCompetitionsFromDB(id, admin);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Models.Competition UserCompetitionManager(string id, string competitionidID)
        {
            try
            {
                return competitionDataSql.GetCompetitionByIdFromDB(id, competitionidID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}