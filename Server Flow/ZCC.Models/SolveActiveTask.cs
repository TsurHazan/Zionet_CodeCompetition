using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class SolveActiveTask
    {
        public SolveActiveTask()
        { }

        public Task task { get; set; }
        public ActiveTasks activeTask { get; set; }
        public Dictionary<string, User> teamMembers { get; set; }
    }
}