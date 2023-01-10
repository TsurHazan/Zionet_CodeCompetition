using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.DAL;

namespace ZCC.Data.Sql
{
    public class categoriesDataSql
    {
        public static Dictionary<int, Models.Categories> catObj=new Dictionary<int, Models.Categories>() ;
        public static Dictionary<int, Models.Categories> SetDataToDictionary(SqlDataReader reader)
        {
            catObj.Clear();
            while (reader.Read())
            {
                int id = reader.GetInt32(0);
                string Name = reader.GetString(1);
                Models.Categories Category = new Models.Categories(id,Name);
                catObj.Add(id, Category);
             
            }
            return catObj;
        }

        public static Dictionary<int, Models.Categories> GetCategoriesFromDB()
        {
            string sqlQuery = "SELECT * FROM Categories";
            SqlServerQuery.miisiksFunc func = SetDataToDictionary;
             Dictionary<int, Models.Categories> ret = (Dictionary<int, Models.Categories>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
            return ret;
        }
    }
}
