using Back_end.Context;
using Back_end.Model;
using Data.Implements.Base;
using Data.Interfaces;

namespace Data.Implements
{
    public class CardsData : BaseData<Cards>, ICardsData
    {
        public CardsData(ApplicationDbContext context) : base(context)
        {
        }
    }
}