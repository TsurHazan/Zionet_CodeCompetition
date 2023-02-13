using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class TeamLive : Team
    {
        public TeamLive() { }
        public int tasksFinished { get; set; }
        public int potentialPoint { get; set; }
    }
}
