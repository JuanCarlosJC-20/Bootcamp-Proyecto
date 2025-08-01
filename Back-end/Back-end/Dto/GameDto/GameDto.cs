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
        public string NamePlayer { get; set; }
        public int GameTime { get; set; }
        public int IdDeckCard {  get; set; }
        public int IdRoom {  get; set; }
    }
}
