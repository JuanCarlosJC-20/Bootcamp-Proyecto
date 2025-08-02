using Back_end.Dto.PlayerDto;
using Back_end.Model;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class PlayerController : BaseController<PlayerDto, Player>
    {
        public PlayerController(
            IPlayerBusiness business,
            ILogger<PlayerController> logger
        ) : base(business, logger)
        {
        }

        protected override int GetEntityId(PlayerDto dto)
        {
            return dto.Id;
        }
    }
}
