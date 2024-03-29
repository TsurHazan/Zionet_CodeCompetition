﻿using System;
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
    public class TeamsDataSql : BaseDataSql
    {
        private string query { get; set; }
        private SqlServerQuery.miisiksFunc func { get; set; }

        // --------------------- Get all team members ---------------------

        public Dictionary<string, User> GetTeamMembers(int competitionID, int teamID)
        {
            try
            {
                func = _GetTeamMembers;
                query = $"select * from [Users]   inner join [Users competitions] on [Users].id = [Users competitions].UserID   where [Users competitions].[TeamID] = {teamID}";
                return (Dictionary<string, User>)SqlServerQuery.getValueFromDB(query, func);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private object _GetTeamMembers(SqlDataReader reader)
        {
            try
            {
                Dictionary<string, User> teamMembers = new Dictionary<string, User>();
                while (reader.Read())
                {
                    User user = new User(reader.GetString(reader.GetOrdinal("id")).ToString(), reader.GetString(reader.GetOrdinal("Name")), reader.GetString(reader.GetOrdinal("Email")));
                    teamMembers.Add(user.email, user);
                }
                return teamMembers;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Get all teams in the competition ---------------------

        public Dictionary<int, Team> GetAllTeamsInCompetition(string competitionID)
        {
            try
            {
                func = _GetAllTeamsInCompetition;
                query = $"select * from [Teams] where [CompetitionID] = {competitionID} ORDER BY Points desc";
                return (Dictionary<int, Team>)SqlServerQuery.getValueFromDB(query, func);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private object _GetAllTeamsInCompetition(SqlDataReader reader)
        {
            try
            {
                Dictionary<int, Team> teams = new Dictionary<int, Team>();

                while (reader.Read())
                {
                    Team team = new Team();
                    team.id = reader.GetInt32(reader.GetOrdinal("id"));
                    team.Name = reader.GetString(reader.GetOrdinal("Name"));
                    team.Points = reader.GetInt32(reader.GetOrdinal("Points"));
                    team.email = reader.GetString(reader.GetOrdinal("email"));
                    team.Icon = reader.GetString(reader.GetOrdinal("Icon (IMAGE)"));
                    team.CompetitionID = reader.GetInt32(reader.GetOrdinal("CompetitionID"));
                    teams.Add(team.id, team);
                }
                return teams;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Get all Live Teams  ---------------------

        public Dictionary<int, TeamLive> GetAllLiveTeams(string competitionID)
        {
            try
            {
                func = _GetAllLiveTeams;
                query = $"select * from [Teams] where [CompetitionID] = {competitionID} ORDER BY Points desc";
                return (Dictionary<int, TeamLive>)SqlServerQuery.getValueFromDB(query, func);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private object _GetAllLiveTeams(SqlDataReader reader)
        {
            try
            {
                Dictionary<int, TeamLive> teams = new Dictionary<int, TeamLive>();

                while (reader.Read())
                {
                    TeamLive team = new TeamLive();
                    team.id = reader.GetInt32(reader.GetOrdinal("id"));
                    team.Name = reader.GetString(reader.GetOrdinal("Name"));
                    team.Points = reader.GetInt32(reader.GetOrdinal("Points"));
                    team.email = reader.GetString(reader.GetOrdinal("email"));
                    team.Icon = reader.GetString(reader.GetOrdinal("Icon (IMAGE)"));
                    team.CompetitionID = reader.GetInt32(reader.GetOrdinal("CompetitionID"));
                    teams.Add(team.id, team);
                }
                return teams;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        // --------------------- Add new Team to a competition ---------------------

        public void AddTeamToCompetition(string competitionID)
        {
            try
            {
                // link is to default picture to a team
                query = $"insert into [Teams] values ('teamtam',0,'','https://www.freepik.com/free-vector/hand-coding-concept-illustration_21864184.htm#query=code&position=24&from_view=search&track=sph',{competitionID})";
                SqlServerQuery.getSingleValueFromDB(query);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Remove a team from competition ---------------------
        public void RemoveTeamFromCompetition(string competitionID)
        {
            try
            {
                query = $"update [Teams] set [CompetitionID] = 1 where [CompetitionID] = {competitionID}";
                SqlServerQuery.runCommand(query);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //-- checks if user is already realetd to the competition, If he is then update his team if he isnt then insert him with the correct information

        public void AddUserToTeam(string teamID, string userId, string competitionID)
        {
            try
            {
                query = $"DECLARE @CompetitionID INT = {competitionID}, @UserID varchar(max) = '{userId}', @TeamID int = {teamID};     if exists(select * from [Users competitions] where [Competition ID]= @CompetitionID and [UserID] = @UserID)  BEGIN     update [Users competitions] set [TeamID] = @TeamID  where( [Competition ID] = @CompetitionID) and ([UserID] like @UserID) END ELSE BEGIN     INSERT INTO [Users competitions] values (@UserID,0, @TeamID, @CompetitionID) END";
                SqlServerQuery.runCommand(query);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // --------------------- Resets a team,Removes all current team members ---------------------
        public void ResetTeam(string teamID)
        {
            try
            {
                query = $"update [Users competitions] set [TeamID] = 1 where [Users competitions].Admin = 0 and [TeamID] ={teamID}";
                SqlServerQuery.runCommand(query);
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
                query = $"select Points from Teams where id = {TeamID}";
                int teamPoint = (int)SqlServerQuery.getSingleValueFromDB(query);
                return teamPoint;
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
                query = $"update [Teams] set Points += {enterPoint} where id = {TeamID}";
                SqlServerQuery.runCommand(query);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public int GetTeamsCountTasksFinishedFromDB(string TeamID)
        {
            try
            {
                query = $"select count(status) from[Active Tasks] where Status like 'Done%' and teamID = {TeamID}";
                int teamTaskCount = (int)SqlServerQuery.getSingleValueFromDB(query);
                return teamTaskCount;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public int GetPotentialPointFromDB(string TeamID)
        {
            try
            {
                query = $"IF EXISTS (SELECT * FROM [Active Tasks] WHERE teamID = {TeamID} and (Status = 'Submitted' or Status = 'In Progress')) BEGIN select sum(points)+sum([Bonus points]) from [Active Tasks] as act inner join Tasks as t on act.taskID = t.id where teamID = {TeamID} and (Status = 'Submitted' or Status = 'In Progress') END ELSE BEGIN SELECT 0 END";
                int potentialPoint = (int) SqlServerQuery.getSingleValueFromDB(query);
                return potentialPoint;
            }
            catch (Exception ex)
            {
                throw;
            }            
        }
    }
}