using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Dto.PlayerCardDto;
using Back_end.Model;

namespace Business.Interfaces
{
    public interface IPlayerCardBusiness : IBaseBusiness<PlayerCard, PlayerCardDto>
    {
        Task<List<PlayerCardDto>> AssignCardsToPlayersAsync(int gameId, int cardsPerPlayer = 8);

        //en la sigueinte metodo especifica obtenemos cada jugador con su carta asignada mas los detalles de la carta y detalles del jugador
        Task<List<PlayerCardDto>> GetPlayerCardsAsync(int playerId);

        //la siguientes es una consula especifica que Obtine todos los jugadores de una partida con un mismo gameId mas la carta asignada
        Task<Dictionary<int, List<PlayerCardDto>>> GetGamePlayerCardsAsync(int gameId);
    }
}
