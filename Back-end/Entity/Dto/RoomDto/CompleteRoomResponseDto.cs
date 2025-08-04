using Back_end.Dto;
using Back_end.Dto.GameDto;
using Back_end.Dto.PlayerDto;
using Back_end.Dto.PlayerCardDto;
using Back_end.Dto.RoomDto;

namespace Back_end.Dto.RoomDto
{
    public class CompleteRoomResponseDto : BaseDto
    {
        public RoomDto Room { get; set; } = new();
        public GameDto Game { get; set; } = new();
        public List<PlayerDto> Players { get; set; } = new();
        public List<PlayerCardDto> PlayerCards { get; set; } = new();
    }
}
