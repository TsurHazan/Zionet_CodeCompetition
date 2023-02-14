using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using ZCC.DAL;
using ZCC.Models;

namespace ZCC.Data.Sql
{
    public class categoriesDataSql : BaseDataSql
    {
        private static SqlServerQuery.miisiksFunc func { get; set; }

        public static Dictionary<string, Models.Categories> catObj = new Dictionary<string, Models.Categories>();

        public static Dictionary<string, Models.Categories> SetDataToDictionary(SqlDataReader reader)
        {
            catObj.Clear();
            while (reader.Read())
            {
                string id = reader.GetString(0);
                Models.Categories Category = new Models.Categories(id);
                catObj.Add(id, Category);
            }
            return catObj;
        }

        public static Dictionary<string, Models.Categories> GetCategoriesFromDB()
        {
            string sqlQuery = "SELECT * FROM Categories";
            func = SetDataToDictionary;
            Dictionary<string, Models.Categories> ret = (Dictionary<string, Models.Categories>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
            return ret;
        }

        public static void setCategoryToDB(string id)
        {
            string sqlQuery = $"insert into Categories values('{id}')";
            DAL.SqlServerQuery.runCommand(sqlQuery);
        }
    }
}