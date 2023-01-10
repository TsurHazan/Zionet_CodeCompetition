using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class Team
    {
        public Team() { }
        public int id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
        public string email { get; set; }
        public string Icon { get; set; }
        public int CompetitionID { get; set; }
    }
}
