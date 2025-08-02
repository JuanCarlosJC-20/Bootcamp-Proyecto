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
        public string NamePlayer { get; set; }
        public string Attribute { get; set; }
        public int IdRound { get; set; }
    }
}
