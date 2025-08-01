using Back_end.Context;
using Back_end.Model.Base;
using Data.Implements.BaseData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Implements.Base
{
    public class BaseData<T> : ABaseData<T> where T : BaseModel
    {
        public BaseData(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();

        }

        public override async Task<T> GetIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);

        }


        public override async Task<T> CreateAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;

        }
        public override async Task<T> UpdateAsync(T entity)
        {

            _dbSet.Update(entity);
            return entity;
        }

        public override async Task<bool> DeleteAsync(int id)
        {

            var entity = await _context.Set<T>().FindAsync(id);
            if (entity != null) return false;

            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
