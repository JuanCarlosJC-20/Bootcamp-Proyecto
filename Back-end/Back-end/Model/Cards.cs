using Back_end.Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Model
{
    public class Cards : BaseModel
    {
        public string Name { get; set; }
        public string image { get; set; }
        public int Health { get; set; }
        public int LetterLevel { get; set; }
        public int Damage { get; set; }
        public int Endurance { get; set; }
        public int Power { get; set; }
        public int Scope { get; set; }

        public ICollection<PlayerCard> PlayerCards{ get; set;}
    }
}
