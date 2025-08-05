using System.Linq.Expressions;
using Back_end.Context;
using Back_end.Model;
using Data.Implements.Base;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Implements
{
    public class CardsData : BaseData<Cards>, ICardsData
    {
        public CardsData(ApplicationDbContext context) : base(context)
        {
            
        }

        public async Task<bool> ExistsByPropertyAsync<TValue>(string propertyName, TValue value)
        {
            if (value == null || (value is string str && string.IsNullOrWhiteSpace(str)))
                return false;

            try
            {
                var parameter = Expression.Parameter(typeof(Cards), "c");
                var property = Expression.PropertyOrField(parameter, propertyName);

                var propertyType = property.Type;
                var convertedValue = Convert.ChangeType(value, propertyType);
                var constant = Expression.Constant(convertedValue, propertyType);

                var equal = Expression.Equal(property, constant);
                var lambda = Expression.Lambda<Func<Cards, bool>>(equal, parameter);

                return await _context.Cards.AnyAsync(lambda);
            }
            catch (Exception)
            {
                return false;
            }
        }

    }
}