using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model;

namespace Data.Interfaces
{
    public interface IPlayerCardData : IBaseData<PlayerCard>
    {
        Task<IEnumerable<PlayerCard>> GetPlayerCardsWithDetailsAsync(int playerId);
        Task<IEnumerable<PlayerCard>> GetGamePlayerCardsAsync(int gameId);
    }
}
