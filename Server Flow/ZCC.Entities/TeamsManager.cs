using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class TeamsManager
    {
        TeamsDataSql teamsDataSql = new TeamsDataSql();

        public Dictionary<string, Team> GetAllTeamsInCompetition(string competitionId) 
        {
            return teamsDataSql.GetAllTeamsInCompetition(competitionId);
        }


        public void AddTeamToCompetition()
        {

        }
    }
}
