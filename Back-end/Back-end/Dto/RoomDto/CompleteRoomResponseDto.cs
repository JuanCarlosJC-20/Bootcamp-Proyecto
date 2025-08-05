using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Dto.RoomDto
{
    public class CompleteRoomResponseDto
    {
        public RoomDto Room { get; set; } = new();
        public GameDto.GameDto Game { get; set; } = new();
        public List<PlayerDto.PlayerDto> Players { get; set; } = new();
        public List<PlayerCardDto.PlayerCardDto> PlayerCard { get; set; } = new();
    }
}


