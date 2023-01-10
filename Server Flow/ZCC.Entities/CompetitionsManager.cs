using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class CompetitionsManager
    {
        public competitionsDataSql CompetitionsDataSQL = new competitionsDataSql();



        public Dictionary<int, Models.Competition> allUserCompetitions(string id)
        { 

            
            return Data.Sql.competitionsDataSql.GetUserCompetitionsFromDB(id);

        }
    }
}
