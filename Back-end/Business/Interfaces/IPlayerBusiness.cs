using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Dto.PlayerDto;
using Back_end.Model;

namespace Business.Interfaces
{
    public interface IPlayerBusiness : IBaseBusiness<Player, PlayerDto>
    {
        Task<IEnumerable<PlayerDto>> GetByGameIdAsync(int gameId);
    }
}
