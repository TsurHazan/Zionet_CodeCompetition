using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class UsersCompetitions
    {
        public UsersCompetitions() { }
        public string UserID { get; set; }
        public bool Admin { get; set; }
        public int TeamID { get; set; }
        public int CompetitionID { get; set; }
    }
}
