using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Data.Sql;
using ZCC.Models;

namespace ZCC.Entities
{
    public class CategoriesManager : BaseEntity
    {
        public Dictionary<string, Models.Categories> allCategories()
        {
            try
            {
                return categoriesDataSql.GetCategoriesFromDB();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void setNewCategory(string id)
        {
            try
            {
                categoriesDataSql.setCategoryToDB(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}