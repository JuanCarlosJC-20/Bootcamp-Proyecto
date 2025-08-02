using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model.Base;

namespace Back_end.Model
{
    public class PlayerCard : BaseModel
    {
        public int IdCard { get; set; }
        public int IdPlayer { get; set; }

        public Cards Card { get; set; }
        public Player Player { get; set; }
    }
}
