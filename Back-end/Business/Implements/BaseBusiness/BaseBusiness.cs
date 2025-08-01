using AutoMapper;
using Back_end.Context;
using Back_end.Dto;
using Back_end.Model.Base;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.BaseBusiness
{
    public abstract class BaseBusiness<T, D> : ABaseBusiness<T, D> where T : BaseModel where D : BaseDto
    {
        protected readonly IMapper _mapper;
        protected readonly IBaseData<T> _data;
        protected readonly ILogger _logger;

        public BaseBusiness(
            IBaseData<T> data,
            IMapper mapper,
            ILogger logger
         )
            : base()
        {
            _data = data ?? throw new ArgumentNullException(nameof(data));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

       
        public override async Task<List<D>> GetAllAsync()
        {
            try
            {
                _logger.LogInformation($"Obteniendo todos los registros de {typeof(T).Name}");
                var entities = await _data.GetAllAsync();
                return _mapper.Map<IList<D>>(entities).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener registros de {typeof(T).Name}");
                throw;
            }
        }

       
        public override async Task<D> GetIdAsync(int id)
        {
            try
            {
                _logger.LogInformation($"Obteniendo {typeof(T).Name} con ID: {id}");
                var entity = await _data.GetIdAsync(id);
                return _mapper.Map<D>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener {typeof(T).Name} con ID {id}");
                throw;
            }
        }

      
        public override async Task<D> CreateAsync(D dto)
        {
            try
            {
                var entity = _mapper.Map<T>(dto);
                entity = await _data.CreateAsync(entity);
                _logger.LogInformation($"Creando nuevo {typeof(T).Name}");
                return _mapper.Map<D>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al crear {typeof(T).Name} desde DTO");
                throw;
            }
        }

   
        public override async Task<D> UpdateAsync(D dto)
        {
            try
            {
                var entity = _mapper.Map<T>(dto);
                entity = await _data.UpdateAsync(entity);
                _logger.LogInformation($"Actualizando {typeof(T).Name} desde DTO");
                return _mapper.Map<D>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al actualizar {typeof(T).Name} desde DTO");
                throw;
            }
        }

  
        public override async Task<bool> DeleteAsync(int id)
        {
            try
            {
                _logger.LogInformation($"Eliminando {typeof(T).Name} con ID: {id}");
                return await _data.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al eliminar {typeof(T).Name} con ID {id}");
                throw;
            }
        }

    }
}
