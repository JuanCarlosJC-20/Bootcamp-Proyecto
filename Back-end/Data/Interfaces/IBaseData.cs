using Back_end.Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IBaseData<T> where T : BaseModel
    {
        
        //Define los metodos
        Task<List<T>> GetAllAsync();
       Task<T> GetIdAsync(int id);
       Task<T> CreateAsync(T entity);
       Task<T> UpdateAsync(T entity);
       Task<bool> DeleteAsync(int id);
    }
}   
