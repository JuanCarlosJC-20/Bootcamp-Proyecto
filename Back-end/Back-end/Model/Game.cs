using Back_end.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Model
{
    internal class Game : EntityBase
    {
        
        public string NamePlayer { get; set; }
        public int GameTime { get; set; }
        public int idGame { get; set; }
        public Game Game { get; set; }
    }
}
