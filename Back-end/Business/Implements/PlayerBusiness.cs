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

        public async Task<IEnumerable<PlayerDto>> GetByGameIdAsync(int gameId)
        {
            _logger.LogInformation("Obteniendo jugadores del juego {GameId}", gameId);

            try
            {
                var players = await _playerData.GetPlayersByGameIdAsync(gameId);
                return _mapper.Map<IEnumerable<PlayerDto>>(players);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener jugadores del juego {GameId}", gameId);
                throw;
            }
        }
    }
}
