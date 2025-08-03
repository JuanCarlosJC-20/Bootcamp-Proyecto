using Back_end.Model.Base;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interfaces

{
    public interface IBaseController<TEntity, TDto> where TEntity : class
    {
        Task<IActionResult> GetAllAsync();
        Task<IActionResult> GetIdAsync(int id);
        Task<IActionResult> CreateAsync(TDto dto);
        Task<IActionResult> UpdateAsync(TDto dto);
        Task<IActionResult> DeleteAsync(int id);

    }
}
