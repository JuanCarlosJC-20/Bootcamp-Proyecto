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

        //en la sigueinte consulta especifica obtenemos cada jugador con su carta asignada mas los detalles de la carta y detalles del jugador
        public async Task<IEnumerable<PlayerCard>> GetPlayerCardsWithDetailsAsync(int idPlayer)
        {
            return await _context.Set<PlayerCard>()
                .Include(pc => pc.Card)
                .Include(pc => pc.Player)
                .Where(pc => pc.IdPlayer == idPlayer)
                .OrderBy(pc => pc.id)
                .ToListAsync();
        }
        //la siguientes es una consula especifica que Obtine todos los jugadores de una partida con un mismo gameId mas la carta asignada
        public async Task<IEnumerable<PlayerCard>> GetGamePlayerCardsAsync(int idGame)
        {
            return await _context.Set<PlayerCard>()
                .Include(pc => pc.Card)
                .Include(pc => pc.Player)
                .Where(pc => pc.Player.IdGame == idGame)
                .OrderBy(pc => pc.Player.id)
                .ThenBy(pc => pc.id)
                .ToListAsync();
        }
    }
}
