using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZCC.Models
{
    public class Categories
    {

        public Categories(int aid,string aname) 
        {
          id = aid;
          name = aname;
        }

        public int id { get; set; }
        public string name { get; set; }
    }
}
