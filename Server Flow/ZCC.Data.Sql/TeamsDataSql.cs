using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.DAL;
using ZCC.Models;

namespace ZCC.Data.Sql
{
    public class TeamsDataSql
    {
        private string query { get; set; }

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
