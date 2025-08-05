using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Back_end.Model;
using System.Threading.Tasks;
using Data.Interfaces;
using Back_end.Dto.RoomDto;

namespace Business.Interfaces
{
    public interface IRoomBusiness : IBaseBusiness<Room , RoomDto>
    {
        Task<CompleteRoomResponseDto> CreateCompleteRoomAsync(RoomDto dto);
    }
}
