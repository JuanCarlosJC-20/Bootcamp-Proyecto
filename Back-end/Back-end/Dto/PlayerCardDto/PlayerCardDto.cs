using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Dto.CardsDto;

namespace Back_end.Dto.PlayerCardDto
{
    public class PlayerCardDto : BaseDto
    {
        public int IdCard { get; set; }
        public int IdPlayer { get; set; }
        public bool IsUsed { get; set; }

        // Información de la carta incluida
        public Back_end.Dto.CardsDto.CardsDto? Card { get; set; } // Fully qualify the type to resolve ambiguity
    }
}
