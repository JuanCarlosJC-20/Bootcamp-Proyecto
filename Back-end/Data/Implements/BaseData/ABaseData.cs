using Back_end.Context;
using Back_end.Model.Base;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Implements.BaseData
{
    public abstract class ABaseData<T> : IBaseData<T> where T : BaseModel
    {     
        protected readonly  ApplicationDbContext _context;
        protected readonly DbSet<T> _dbSet;
        protected ABaseData(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }


        //metodos 

        public abstract Task<List<T>> GetAllAsync();  
        public abstract Task<T> GetIdAsync(int id);
        public abstract Task<T> CreateAsync(T entity);
        public abstract Task<T> UpdateAsync(T entity);
        public abstract Task<bool> DeleteAsync(int id);

        
    }
}
