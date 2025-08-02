using AutoMapper;
using Back_end.Dto.RoomDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;

namespace Business.Implements
{
    public class RoomBusiness : BaseBusiness<Room, RoomDto>, IRoomBusiness
    {
        public RoomBusiness(
            IBaseData<Room> data,
            IMapper mapper,
            ILogger<RoomBusiness> logger
        ) : base(data, mapper, logger)
        {
        }
    }
}