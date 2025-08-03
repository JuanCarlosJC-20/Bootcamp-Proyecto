using Back_end.Dto.CardsDto;
using Back_end.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface ICardsData : IBaseData<Cards>
    {
        Task<bool> ExistsByPropertyAsync<TValue>(string propertyName, TValue value);
        Task<bool> ExistsCardWithSameDataAsync(Cards card);
    }
}
