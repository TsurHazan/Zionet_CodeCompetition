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
            try
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
            catch (Exception ex)
            {
                throw;
            }
        }

        public static Dictionary<string, Models.Categories> GetCategoriesFromDB()
        {
            try
            {
                string sqlQuery = "SELECT * FROM Categories";
                func = SetDataToDictionary;
                Dictionary<string, Models.Categories> ret = (Dictionary<string, Models.Categories>)DAL.SqlServerQuery.getValueFromDB(sqlQuery, func);
                return ret;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static void setCategoryToDB(string id)
        {
            try
            {
                string sqlQuery = $"insert into Categories values('{id}')";
                DAL.SqlServerQuery.runCommand(sqlQuery);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}