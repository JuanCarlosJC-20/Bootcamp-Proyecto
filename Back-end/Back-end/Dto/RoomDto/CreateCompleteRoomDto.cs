using Back_end.Dto;

namespace Back_end.Dto.RoomDto
{
    public class CreateCompleteRoomDto : BaseDto
    {
        public string RoomName { get; set; } = string.Empty;
        public int NumPlayers { get; set; }
    }
}
