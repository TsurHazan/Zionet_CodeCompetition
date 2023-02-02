using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class ActiveTasks
    {
        public ActiveTasks() { }
        public int id { get; set; }
        public int teamID { get; set; }
        public int competitionID { get; set; }
        public int taskID { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public DateTime submitTime { get; set; }
        public string Status { get; set; }
        public bool bonus { get; set; }
        public string gitRepo { get; set; }
    
    }
}

