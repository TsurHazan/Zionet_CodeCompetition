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
    public class TeamsDataSql
    {
        private string query { get; set; }
        private SqlServerQuery.miisiksFunc func { get; set; }



        // --------------------- Get all teams in the competition ---------------------

        public Dictionary<string, Team> GetAllTeamsInCompetition(string competitionID)
        {
            func = _GetAllTeamsInCompetition;
            query = $"select * from [Teams] where [CompetitionID] = {competitionID}";
            return (Dictionary<string, Team>) SqlServerQuery.getValueFromDB(query, func);
        }
        private object _GetAllTeamsInCompetition(SqlDataReader reader)
        {
            Dictionary<string, Team> teams = new Dictionary<string, Team>();

            while (reader.Read())
            {
                Team team= new Team();
                team.id = reader.GetInt32(reader.GetOrdinal("id"));
                team.Name = reader.GetString(reader.GetOrdinal("Name"));
                team.Points = reader.GetInt32(reader.GetOrdinal("Points"));
                team.email = reader.GetString(reader.GetOrdinal("email"));
                team.Icon = reader.GetString(reader.GetOrdinal("Icon (IMAGE)"));
                team.CompetitionID = reader.GetInt32(reader.GetOrdinal("CompetitionID"));
                teams.Add(team.Name, team);
            }
            return teams;
        }

        // --------------------- Add new Team to a competition ---------------------

        public void AddTeamToCompetition(string competitionID,Team newTeam)
        {
            // link is to default picture to a team

            query = $"insert into [Teams] values ('{newTeam.Name}',0,'','https://www.freepik.com/free-vector/hand-coding-concept-illustration_21864184.htm#query=code&position=24&from_view=search&track=sph',{newTeam.CompetitionID})";
            SqlServerQuery.runCommand(query) ;
        }

        // --------------------- Remove a team from competition ---------------------
        public void RemoveTeamFromCompetition(string competitionID)
        {
            query = $"update [Teams] set [CompetitionID] = 1 where [CompetitionID] = {competitionID}";
            SqlServerQuery.runCommand(query) ;
        }   

        //-- checks if user is already realetd to the competition, If he is then update his team if he isnt then insert him with the correct information

        public void AddUserToTeam(string teamID,string userId,string competitionID) 
        {
            query = $"DECLARE @CompetitionID INT = {competitionID},\r\n        @UserID varchar(max) = '{userId}',\r\n        @TeamID int = {teamID};\r\n\t\t\r\n if exists(select * from [Users competitions] where [Competition ID]= @CompetitionID and [UserID] = @UserID)\r\n BEGIN\r\n    update [Users competitions] set [TeamID] = @TeamID\r\n\twhere( [Competition ID] = @CompetitionID) and ([UserID] like @UserID)\r\nEND\r\nELSE\r\nBEGIN\r\n    INSERT INTO [Users competitions] values (@UserID,0, @TeamID, @CompetitionID)\r\nEND";
            SqlServerQuery.runCommand(query) ;
        }

       

    }
}
