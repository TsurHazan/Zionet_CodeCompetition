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
        private TeamsDataSql teamsDataSql = new TeamsDataSql();

        public void UpdateTeam(User[] team, string competitionID, string teamID)
        {
            foreach (User user in team)
            {
                teamsDataSql.AddUserToTeam(teamID, user.user_id, competitionID);
            }
        }

        public Dictionary<string, User> GetTeamMembers(int competitionID, int teamID)
        {
            return teamsDataSql.GetTeamMembers(competitionID, teamID);
        }

        public Dictionary<int, Team> GetAllTeamsInCompetition(string competitionId)
        {
            return teamsDataSql.GetAllTeamsInCompetition(competitionId);
        }

        public void AddTeamToCompetition(string competitionID)
        {
            teamsDataSql.AddTeamToCompetition(competitionID);
        }

        public int GetTeamsPoint(string TeamID)
        {
           return teamsDataSql.GetTeamsPoint(TeamID);
        }
        public void UpdateTeamsPoint(string TeamID,string enterPoint)
        {
            teamsDataSql.UpdateTeamsPoint(TeamID, enterPoint);
        }

    }
}