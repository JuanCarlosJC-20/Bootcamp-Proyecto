using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model.Base;

namespace Back_end.Model
{
    public class Room : BaseModel
    {
        public string RoomName { get; set; }
        public int NumPlayers { get; set; }
        public int PlayerWinner { get; set; }


        public Game Game { get; set; }
    }
}
