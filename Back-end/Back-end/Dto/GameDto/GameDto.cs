using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model.Base;

namespace Back_end.Dto.GameDto
{
    public class GameDto : BaseDto
    {
        public DateTime GameTime { get; set; }
        public int IdPlayerWinner { get; set; }
        public int IdRoom { get; set; }
    }
}
