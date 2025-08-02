using AutoMapper;
using Back_end.Dto.TurnDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;

namespace Business.Implements
{
    public class TurnBusiness : BaseBusiness<Turn, TurnDto>, ITurnBusiness
    {
        public TurnBusiness(
            IBaseData<Turn> data,
            IMapper mapper,
            ILogger<TurnBusiness> logger
        ) : base(data, mapper, logger)
        {
        }
    }
}