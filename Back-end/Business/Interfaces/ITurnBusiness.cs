using System;
using System.Collections.Generic;
using System.Linq;
using Back_end.Model;
using System.Text;
using System.Threading.Tasks;
using Back_end.Dto.TurnDto;

namespace Business.Interfaces
{
    public interface ITurnBusiness : IBaseBusiness<Turn, TurnDto>
    {
    }
}
