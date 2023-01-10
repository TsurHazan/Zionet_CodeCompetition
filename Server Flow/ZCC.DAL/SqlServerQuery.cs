using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.DAL
{
    public class SqlServerQuery
    {
        private const string connectionString = "Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=CompetitionsProject;Data Source=localhost\\SQLEXPRESS";

        public delegate object miisiksFunc(SqlDataReader reader);

        public static void runCommand(string sqlQuery)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // Adapter
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    //Reader
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        reader.Read();
                    }
                }
            }
        }

        public static object getValueFromDB(string sqlQuery, miisiksFunc func)
        {
            object ret = null;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    try { 
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader != null)
                        {
                            ret = func(reader);
                        }

                    }
                    } catch(Exception) { return "invalid parameters"; }
                }
            }

            return ret;
        }



        //execute scalar to get single value answer from sql query
        public static object getSingleValueFromDB(string sqlQuery)
        {

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    return command.ExecuteScalar();

                }
            }
        }
    }
}