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
        private readonly IPlayerBusiness _playerBusiness;
        private readonly ICardsBusiness _cardsBusiness;

        public PlayerCardBusiness(
            IBaseData<PlayerCard> data,
            IPlayerCardData playerCardData,
            IPlayerBusiness playerBusiness,
            ICardsBusiness cardsBusiness,
            IMapper mapper,
            ILogger<PlayerCardBusiness> logger
        ) : base(data, mapper, logger)
        {
            _playerCardData = playerCardData;
            _playerBusiness = playerBusiness;
            _cardsBusiness = cardsBusiness;
        }

        public async Task<List<PlayerCardDto>> AssignCardsToPlayersAsync(int gameId, int cardsPerPlayer = 8)
        {
            _logger.LogInformation("Asignando {CardsPerPlayer} cartas a cada jugador del juego {GameId}", cardsPerPlayer, gameId);

            try
            {
                // Obtener todos los jugadores del game
                var players = await _playerBusiness.GetByGameIdAsync(gameId);
                if (!players.Any())
                {
                    _logger.LogWarning("No se encontraron jugadores para el juego {GameId}", gameId);
                    return new List<PlayerCardDto>();
                }

                // Obtener todas las cartas disponibles en el game
                var allCards = await _cardsBusiness.GetAllAsync();
                if (!allCards.Any())
                {
                    _logger.LogWarning("No se encontraron cartas disponibles");
                    return new List<PlayerCardDto>();
                }

                var assignedCards = new List<PlayerCardDto>();
                var random = new Random();

                // Asignar cartas aleatorias unicas  a cada jugador
                foreach (var player in players)
                {
                    _logger.LogDebug("Asignando cartas al jugador {PlayerId} - {PlayerName}", player.Id, player.NamePlayer);

                    for (int i = 0; i < cardsPerPlayer; i++)
                    {
                        var randomCard = allCards[random.Next(allCards.Count())];
                        
                        var playerCardDto = new PlayerCardDto
                        {
                            IdPlayer = player.Id,
                            IdCard = randomCard.Id,
                            IsUsed = false
                        };

                        var createdPlayerCard = await CreateAsync(playerCardDto);
                        assignedCards.Add(createdPlayerCard);
                    }
                }

                _logger.LogInformation("Se asignaron exitosamente {TotalCards} cartas a {PlayerCount} jugadores", 
                    assignedCards.Count, players.Count());

                return assignedCards;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al asignar cartas a jugadores del juego {GameId}", gameId);
                throw;
            }
        }

        public async Task<List<PlayerCardDto>> GetPlayerCardsAsync(int playerId)
        {
            _logger.LogInformation("Obteniendo cartas del jugador {PlayerId}", playerId);

            try
            {
                var playerCards = await _playerCardData.GetPlayerCardsWithDetailsAsync(playerId);
                return _mapper.Map<List<PlayerCardDto>>(playerCards);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener cartas del jugador {PlayerId}", playerId);
                throw;
            }
        }

        public async Task<Dictionary<int, List<PlayerCardDto>>> GetGamePlayerCardsAsync(int gameId)
        {
            _logger.LogInformation("Obteniendo cartas de todos los jugadores del juego {GameId}", gameId);

            try
            {
                var allPlayerCards = await _playerCardData.GetGamePlayerCardsAsync(gameId);
                var playerCardDtos = _mapper.Map<List<PlayerCardDto>>(allPlayerCards);
                
                // Organizar por jugador
                return playerCardDtos
                    .GroupBy(pc => pc.IdPlayer)
                    .ToDictionary(g => g.Key, g => g.ToList());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener cartas de jugadores del juego {GameId}", gameId);
                throw;
            }
        }
    }
}
