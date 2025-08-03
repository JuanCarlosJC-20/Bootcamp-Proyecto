using Back_end.Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Model
{
    public class Game : BaseModel
    {
        public DateTime GameTime { get; set; }
        public int IdPlayerWinner { get; set; }

        public int IdRoom { get; set; }
        public Room Room { get; set; }

        public ICollection<Player> Players { get; set; }
        public ICollection<Round> Rounds { get; set; }
    }
}
