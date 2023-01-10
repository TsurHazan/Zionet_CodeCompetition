using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class Competition
    {
        public Competition()
        { 
        
        }

        public int id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int numOfTeams { get; set; }
        public string status { get; set; }

        public string Name { get; set; }
        public string hashcode { get; set; }
        public int maxActiveTasks { get; set; }
    }
}