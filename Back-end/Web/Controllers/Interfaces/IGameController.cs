
using Back_end.Dto.GameDto;
using Back_end.Model;
using Web.Controllers.Interfaces;

namespace Web.Controllers.Interface
{
    public interface IGameController : IBaseController<Game, GameDto>
    {

    }
}


