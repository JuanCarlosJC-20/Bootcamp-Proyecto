using Back_end.Dto;
using Back_end.Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IBaseBusiness<T, D> where T : BaseModel where D : BaseDto
    {
        //Define los metodos
        Task<List<D>> GetAllAsync();
        Task<D> GetIdAsync(int id);
        Task<D> CreateAsync(D dto);
        Task<D> UpdateAsync(D dto);
        Task<bool> DeleteAsync(int id);
    }
}
