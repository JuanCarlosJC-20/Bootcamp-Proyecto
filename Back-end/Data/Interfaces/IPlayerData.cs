using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Model;

namespace Data.Interfaces
{
    public interface IPlayerData : IBaseData<Player>
    {
        Task<IEnumerable<Player>> GetPlayersByGameIdAsync(int gameId);
    }
}
