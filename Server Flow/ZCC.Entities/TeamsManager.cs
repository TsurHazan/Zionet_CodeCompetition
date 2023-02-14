using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class TeamsManager : BaseEntity
    {
        private TeamsDataSql teamsDataSql = new TeamsDataSql();

        public void UpdateTeam(User[] team, string competitionID, string teamID)
        {
            try
            {
                teamsDataSql.ResetTeam(teamID);
                foreach (User user in team)
                {
                    teamsDataSql.AddUserToTeam(teamID, user.user_id, competitionID);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Dictionary<string, User> GetTeamMembers(int competitionID, int teamID)
        {
            try
            {
                return teamsDataSql.GetTeamMembers(competitionID, teamID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Dictionary<int, Team> GetAllTeamsInCompetition(string competitionId)
        {
            try
            {
                Dictionary<int, Team> Dteam = teamsDataSql.GetAllTeamsInCompetition(competitionId);
                return Dteam;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void AddTeamToCompetition(string competitionID)
        {
            try
            {
                teamsDataSql.AddTeamToCompetition(competitionID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int GetTeamsPoint(string TeamID)
        {
            try
            {
                return teamsDataSql.GetTeamsPoint(TeamID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void UpdateTeamsPoint(string TeamID, string enterPoint)
        {
            try
            {
                teamsDataSql.UpdateTeamsPoint(TeamID, enterPoint);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public Dictionary<int, TeamLive> GetAllLiveTeams(string competitionId)
        {
            try
            {
                Dictionary<int, TeamLive>  Dteam = teamsDataSql.GetAllLiveTeams(competitionId);
                return Dteam;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public int GetTeamsCountTasksFinished(string TeamID)
        {
            try
            {
                return teamsDataSql.GetTeamsCountTasksFinishedFromDB(TeamID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public int GetPotentialPoint(string TeamID)
        {
            try
            {
                return teamsDataSql.GetPotentialPointFromDB(TeamID);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}