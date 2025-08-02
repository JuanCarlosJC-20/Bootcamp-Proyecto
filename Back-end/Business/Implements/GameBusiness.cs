using AutoMapper;
using Back_end.Dto.GameDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;

namespace Business.Implements
{
    public class GameBusiness : BaseBusiness<Game, GameDto>, IGameBusiness
    {
        public GameBusiness(
            IBaseData<Game> data,
            IMapper mapper,
            ILogger<GameBusiness> logger
        ) : base(data, mapper, logger)
        {
        }
    }
}