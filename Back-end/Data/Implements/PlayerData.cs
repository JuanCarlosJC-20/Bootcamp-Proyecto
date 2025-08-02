using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Context;
using Back_end.Model;
using Data.Implements.Base;
using Data.Interfaces;

namespace Data.Implements
{
    public class PlayerData : BaseData<Player>, IPlayerData
    {
        public PlayerData(ApplicationDbContext context) : base(context)
        {
        }

    }
}
