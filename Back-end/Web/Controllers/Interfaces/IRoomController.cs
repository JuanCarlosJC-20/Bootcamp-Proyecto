

using Back_end.Dto.RoomDto;
using Back_end.Model;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Interfaces;

namespace Web.Controllers.Interface
{
    public interface IRoomController : IBaseController<Room, RoomDto>
    {
        Task<IActionResult> CreateCompleteRoom(CreateCompleteRoomDto dto);
    }
}


