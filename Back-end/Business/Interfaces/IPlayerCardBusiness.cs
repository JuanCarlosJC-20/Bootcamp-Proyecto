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
        Task<List<PlayerCardDto>> GetPlayerCardsAsync(int playerId);
        Task<Dictionary<int, List<PlayerCardDto>>> GetGamePlayerCardsAsync(int gameId);
    }
}
