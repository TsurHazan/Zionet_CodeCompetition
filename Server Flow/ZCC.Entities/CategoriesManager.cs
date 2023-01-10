using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class CategoriesManager
    {

        public Dictionary<int,Models.Categories> allCategories()
        {

            return categoriesDataSql.GetCategoriesFromDB();
        }
    }
}
