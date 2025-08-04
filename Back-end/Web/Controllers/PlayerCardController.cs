using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Back_end.Dto.PlayerCardDto;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerCardController : ControllerBase
    {
        private readonly IPlayerCardBusiness _playerCardBusiness;
        private readonly ILogger<PlayerCardController> _logger;

        public PlayerCardController(
            IPlayerCardBusiness playerCardBusiness,
            ILogger<PlayerCardController> logger)
        {
            _playerCardBusiness = playerCardBusiness;
            _logger = logger;
        }

        [HttpGet("player/{playerId}")]
        public async Task<IActionResult> GetPlayerCards(int playerId)
        {
            try
            {
                _logger.LogInformation("Obteniendo cartas del jugador {PlayerId}", playerId);
                var playerCards = await _playerCardBusiness.GetPlayerCardsAsync(playerId);
                return Ok(playerCards);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener cartas del jugador {PlayerId}", playerId);
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpGet("game/{gameId}")]
        public async Task<IActionResult> GetGamePlayerCards(int gameId)
        {
            try
            {
                _logger.LogInformation("Obteniendo todas las cartas de jugadores del juego {GameId}", gameId);
                
                var result = await _playerCardBusiness.GetGamePlayerCardsAsync(gameId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener cartas de jugadores del juego {GameId}", gameId);
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPut("{id}/use")]
        public async Task<IActionResult> MarkCardAsUsed(int id)
        {
            try
            {
                _logger.LogInformation("Marcando carta como usada: {PlayerCardId}", id);
                
                var playerCard = await _playerCardBusiness.GetIdAsync(id);
                if (playerCard == null)
                {
                    return NotFound($"PlayerCard con ID {id} no encontrada");
                }

                playerCard.IsUsed = true;
                var updatedCard = await _playerCardBusiness.UpdateAsync(playerCard);
                
                return Ok(updatedCard);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al marcar carta como usada: {PlayerCardId}", id);
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
    }
}
