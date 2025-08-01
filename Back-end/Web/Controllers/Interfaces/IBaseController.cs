using Back_end.Model.Base;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interfaces

{
    public interface IBaseController<TEntity, TDto> where TEntity : class
    {
        Task<ActionResult> GetAllAsync();
        Task<ActionResult> GetIdAsync(int id);
        Task<ActionResult> CreateAsync(TDto dto);
        Task<ActionResult> UpdateAsync(TDto dto);
        Task<ActionResult> DeleteAsync(int id);

    }
}
