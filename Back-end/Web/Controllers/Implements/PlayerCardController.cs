using Back_end.Dto.PlayerCardDto;
using Back_end.Model;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class PlayerCardController : BaseController<PlayerCardDto, PlayerCard>
    {
        public PlayerCardController(
            IPlayerCardBusiness business,
            ILogger<PlayerCardController> logger
        ) : base(business, logger)
        {
        }

        protected override int GetEntityId(PlayerCardDto dto)
        {
            return dto.Id;
        }
    }
}
