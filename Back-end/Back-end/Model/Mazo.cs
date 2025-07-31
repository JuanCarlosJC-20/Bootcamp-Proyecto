using Back_end.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Model
{
    public class Mazo : EntityBase
    {
       
        public string TypeDeckCards { get; set; }
        public Cards Cards { get; set; }
    }
}
