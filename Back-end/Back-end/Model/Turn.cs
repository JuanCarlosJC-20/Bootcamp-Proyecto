using Back_end.Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Model
{
    public class Turn : BaseModel
    {

        public string NamePlayer { get; set; }
        public string attribute { get; set; }

        //Forgein keys
        public int IdRound { get; set; }
        public Round Round { get; set; }


    }
}
