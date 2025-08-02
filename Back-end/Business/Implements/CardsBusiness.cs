using AutoMapper;
using Back_end.Dto.CardsDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;

namespace Business.Implements
{
    public class CardsBusiness : BaseBusiness<Cards, CardsDto>, ICardsBusiness
    {
        public CardsBusiness(
            IBaseData<Cards> data,
            IMapper mapper,
            ILogger<CardsBusiness> logger
        ) : base(data, mapper, logger)
        {
        }
    }
}