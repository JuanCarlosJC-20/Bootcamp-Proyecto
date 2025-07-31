using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Base
{
    public class EntityBase
    {
        public int id { get; set; }    
        public bool status { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime DeleteAt { get; set; }
    }
}
