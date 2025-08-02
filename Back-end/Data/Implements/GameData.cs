using Back_end.Context;
using Back_end.Model;
using Data.Implements.Base;
using Data.Interfaces;

namespace Data.Implements
{
    public class GameData : BaseData<Game>, IGameData
    {
        public GameData(ApplicationDbContext context) : base(context)
        {
        }
    }
}