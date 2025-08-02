using AutoMapper;
using Back_end.Dto.RaundDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;

namespace Business.Implements
{
    public class RoundBusiness : BaseBusiness<Round, RoundDto>, IRoundBusiness
    {
        public RoundBusiness(
            IBaseData<Round> data,
            IMapper mapper,
            ILogger<RoundBusiness> logger
        ) : base(data, mapper, logger)
        {
        }
    }
}