using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model;
using Back_end.Model.Base;

namespace Back_end.Dto.RaundDto
{
    public class RoundDto : BaseDto
    {
        public string atrribute { get; set; }
        public string NameWinner { get; set; }

        //Foreing keys

        public int idGame { get; set; }
    }
}
