using Back_end.Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_end.Dto.TurnDto
{
    public class TurnDto : BaseDto
    {
        public string ValueAttribute { get; set; }
        public int IdPlayer { get; set; }
        public int IdRound { get; set; }
    }
}
