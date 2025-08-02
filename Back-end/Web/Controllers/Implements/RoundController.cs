using Back_end.Dto.RaundDto;
using Back_end.Model;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Implements;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class RoundController : BaseController<RoundDto, Round>
    {
        public RoundController(
            IRoundBusiness business,
            ILogger<RoundController> logger
        ) : base(business, logger)
        {
        }

        protected override int GetEntityId(RoundDto dto)
        {
            return dto.Id;
        }
    }
}