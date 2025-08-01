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
        
        public string NamePlayer { get; set; }
        public int GameTime { get; set; }


        // Foreign Key
        public int IdDeckCard { get; set; }

        public int IdRoom { get; set; }
        public Room Room { get; set; }
        public ICollection<Cards> Cards { get; set; }

        public ICollection<Round> Round { get; set; }
    }
}
