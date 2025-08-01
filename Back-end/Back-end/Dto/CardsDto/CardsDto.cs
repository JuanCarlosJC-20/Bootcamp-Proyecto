using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model.Base;

namespace Back_end.Dto.CardsDto
{
    public class CardsDto : BaseDto
    {
        public string Name { get; set; } 
        public string image { get; set; }
        public int Health { get; set; }
        public int LetterLevel { get; set; }
        public int Damage { get; set; }
        public int Endurance { get; set; }
        public int Power { get; set; }
        public int Scope { get; set; }
        public string Category { get; set; }
        public int IdGame { get; set; }

    }
}
