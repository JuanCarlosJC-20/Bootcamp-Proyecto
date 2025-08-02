using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model.Base;

namespace Back_end.Model
{
    public class Player : BaseModel
    {
        public string NamePlayer { get; set; }

        public int IdGame { get; set; }
        public Game Game { get; set; }

        public ICollection<PlayerCard> PlayerCards { get; set; }
        public ICollection<Turn> Turn { get; set; }
    }
}
