
using Back_end.Dto.CardsDto;
using Back_end.Model;
using Web.Controllers.Interfaces;

namespace Web.Controllers.Interface
{
    public interface ICardsController : IBaseController<Cards, CardsDto>
    {
        
    }
}


