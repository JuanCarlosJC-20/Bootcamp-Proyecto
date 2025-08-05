using Back_end.Dto;
using Back_end.Dto.CardsDto;
using Back_end.Dto.PlayerDto;

namespace Back_end.Dto.PlayerCardDto
{
    public class PlayerCardWithDetailsDto : BaseDto
    {
        public int IdPlayer { get; set; }
        public int IdCard { get; set; }
        public bool IsUsed { get; set; }
x        public PlayerDto.PlayerDto Player { get; set; } = new(); // Fully qualify PlayerDto to avoid namespace conflict
        public CardsDto.CardsDto Card { get; set; } = new(); // Fully qualify CardsDto to resolve ambiguity
    }
}
