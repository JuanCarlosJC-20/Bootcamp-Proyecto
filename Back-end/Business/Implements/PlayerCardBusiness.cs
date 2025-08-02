using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Back_end.Dto.PlayerCardDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;

namespace Business.Implements
{
    public class PlayerCardBusiness : BaseBusiness<PlayerCard, PlayerCardDto>, IPlayerCardBusiness
    {
        private readonly IPlayerCardData _playerCardData;

        public PlayerCardBusiness(
            IBaseData<PlayerCard> data,
            IPlayerCardData playerCardData,
            IMapper mapper,
            ILogger<PlayerCardBusiness> logger
        ) : base(data, mapper, logger)
        {
            _playerCardData = playerCardData;
        }
    }
}
