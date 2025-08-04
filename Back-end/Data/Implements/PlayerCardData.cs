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
    public class PlayerCardData : BaseData<PlayerCard>, IPlayerCardData
    {
        public PlayerCardData(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<PlayerCard>> GetPlayerCardsWithDetailsAsync(int playerId)
        {
            return await _context.Set<PlayerCard>()
                .Include(pc => pc.Card)
                .Include(pc => pc.Player)
                .Where(pc => pc.IdPlayer == playerId)
                .OrderBy(pc => pc.id)
                .ToListAsync();
        }

        public async Task<IEnumerable<PlayerCard>> GetGamePlayerCardsAsync(int gameId)
        {
            return await _context.Set<PlayerCard>()
                .Include(pc => pc.Card)
                .Include(pc => pc.Player)
                .Where(pc => pc.Player.IdGame == gameId)
                .OrderBy(pc => pc.Player.id)
                .ThenBy(pc => pc.id)
                .ToListAsync();
        }
    }
}
