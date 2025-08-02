using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Dto.PlayerDto
{
    public class PlayerDto : BaseDto
    {
        public string NamePlayer { get; set; }
        public int IdGame { get; set; }
    }
}
