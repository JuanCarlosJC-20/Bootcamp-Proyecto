using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Context;
using Back_end.Model;
using Data.Implements.Base;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Implements
{
    public class PlayerData : BaseData<Player>, IPlayerData
    {
        public PlayerData(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Player>> GetPlayersByGameIdAsync(int gameId)
        {
            return await _context.Set<Player>()
                .Where(p => p.IdGame == gameId)
                .OrderBy(p => p.id)
                .ToListAsync();
        }
    }
}
