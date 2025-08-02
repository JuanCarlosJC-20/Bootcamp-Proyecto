using System;
using System.Collections.Generic;
using System.Linq;
using Back_end.Model;
using System.Text;
using System.Threading.Tasks;
using Back_end.Dto.CardsDto;

namespace Business.Interfaces
{
    public interface ICardsBusiness : IBaseBusiness<Cards, CardsDto>
    {
    }
}
