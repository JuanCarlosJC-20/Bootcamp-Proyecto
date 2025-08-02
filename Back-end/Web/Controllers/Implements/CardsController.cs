using Back_end.Dto.CardsDto;
using Back_end.Model;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Implements;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class CardsController : BaseController<CardsDto, Cards>
    {
        public CardsController(
            ICardsBusiness business,
            ILogger<CardsController> logger
        ) : base(business, logger)
        {
        }

        protected override int GetEntityId(CardsDto dto)
        {
            return dto.Id;
        }
    }
}