using Back_end.Dto.TurnDto;
using Back_end.Model;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Implements;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class TurnController : BaseController<TurnDto, Turn>
    {
        public TurnController(
            ITurnBusiness business,
            ILogger<TurnController> logger
        ) : base(business, logger)
        {
        }

        protected override int GetEntityId(TurnDto dto)
        {
            return dto.Id;
        }
    }
}