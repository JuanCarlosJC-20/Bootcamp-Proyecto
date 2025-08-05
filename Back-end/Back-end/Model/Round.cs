using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model.Base;

namespace Back_end.Model
{
    public class Round : BaseModel
    {
        public string Attribute { get; set; }
        public int NumRound { get; set; }
        public int IdPlayerWinner { get; set; }

        public int IdGame { get; set; }
        public Game Game { get; set; }

        public ICollection<Turn> Turn { get; set; }
    }
}
