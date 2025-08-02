using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model.Base;


namespace Back_end.Dto.RoomDto
{
    public class RoomDto : BaseDto
    {
        public string RoomName { get; set; }
        public int NumPlayers { get; set; }
    }
}
