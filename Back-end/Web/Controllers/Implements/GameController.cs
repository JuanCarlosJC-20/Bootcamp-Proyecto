using Back_end.Dto.GameDto;
using Back_end.Model;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Implements;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class GameController : BaseController<GameDto, Game>
    {
        public GameController(
            IGameBusiness business,
            ILogger<GameController> logger
        ) : base(business, logger)
        {
        }

        protected override int GetEntityId(GameDto dto)
        {
            return dto.Id;
        }
    }
}