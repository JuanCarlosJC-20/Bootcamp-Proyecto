using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back_end.Context;
using Back_end.Dto;
using Back_end.Model.Base;
using Business.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Business.Implements.BaseBusiness
{
    public abstract class ABaseBusiness<T, D> : IBaseBusiness<T, D> where T : BaseModel where D : BaseDto
    {
      
        //metodos 

        public abstract Task<List<D>> GetAllAsync();
        public abstract Task<D> GetIdAsync(int id);
        public abstract Task<D> CreateAsync(D dto);
        public abstract Task<D> UpdateAsync(D dto);
        public abstract Task<bool> DeleteAsync(int id);
    }
}
