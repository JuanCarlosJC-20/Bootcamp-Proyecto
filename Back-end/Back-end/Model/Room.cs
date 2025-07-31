using System;
using Back_end.Base;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Model
{
    public class Room : EntityBase
    {
        public string RoomName { get; set; }
        public int NumPlayes { get; set; }
        public int PlayerWinner { get; set; }
        public Game Game { get; set; }
    }
}
