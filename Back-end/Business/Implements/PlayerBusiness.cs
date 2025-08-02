using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Back_end.Dto.PlayerDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;

namespace Business.Implements
{
    public class PlayerBusiness : BaseBusiness<Player, PlayerDto>, IPlayerBusiness
    {
        private readonly IPlayerData _playerData;

        public PlayerBusiness(IBaseData<Player> data, IPlayerData playerData, IMapper mapper, ILogger<PlayerBusiness> logger) : base(data, mapper, logger)
        {
            _playerData = playerData;
        }
    }
}
