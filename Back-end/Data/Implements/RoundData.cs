using Back_end.Context;
using Back_end.Model;
using Data.Implements.Base;
using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Implements
{
    public class RoundData : BaseData<Round>, IRoundData
    {
        public RoundData(ApplicationDbContext cotext) : base(cotext)
        {

        }
    }
}
