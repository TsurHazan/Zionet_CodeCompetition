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
    public class ParticipantManager : BaseEntity
    {
        // --------------------- Search for user team in Running competition ---------------------
        public string FindParticipantTeam(string participantId, string competitionID)
        {
            return ParticipantDataSql.FindParticipantTeam(participantId, competitionID);
        }

        // --------------------- Check if participant is in a team ---------------------
        public bool checkIfParticipantIsInTeam(string UserID, string CompetitionID, string TeamID)
        {
            return ParticipantDataSql.checkIfParticipantIsInTeam(UserID, CompetitionID, TeamID);
        }
    }
}