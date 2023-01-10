using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class Task
    {
        public Task() { }
        public int id { get; set; }
        public int CompetitionID { get; set; }
        public int CategoryID { get; set; }
        public int Timeframe { get; set; }
        public int points { get; set; }
        public string Description { get; set; }
        public int BonusPoints { get; set; }
        public int BonusTime { get; set; }
        public string name { get; set; }
    }
}
