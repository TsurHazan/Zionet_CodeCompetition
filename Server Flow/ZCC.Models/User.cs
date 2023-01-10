using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class User
    {
        public User(string id_auth0, string nAme, string eMail)
        {
            user_id = id_auth0;
            name = nAme;
            email = eMail;
        }

        public string user_id { get; set; }

        public string name { get; set; }

        public string email { get; set; }
    }
}