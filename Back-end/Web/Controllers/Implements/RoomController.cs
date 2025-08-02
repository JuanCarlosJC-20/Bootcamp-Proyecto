using Back_end.Dto.RoomDto;
using Back_end.Model;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Implements;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class RoomController : BaseController<RoomDto, Room>
    {
        public RoomController(
            IRoomBusiness business,
            ILogger<RoomController> logger
        ) : base(business, logger)
        {
        }

        protected override int GetEntityId(RoomDto dto)
        {
            return dto.Id;
        }
    }
}