using Back_end.Dto.CardsDto;
using Back_end.Model;
using Business.Implements;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Utilities.Exceptions;
using Web.Controllers.Implements;
using Web.Controllers.Interface;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class CardsController : BaseController<CardsDto, Cards>
    {

        private readonly ICardsBusiness _cardsBusiness;
        public CardsController(
            ICardsBusiness cardsBusiness,
            ILogger<CardsController> logger
        ) : base(cardsBusiness, logger)
        {
            _cardsBusiness = cardsBusiness;
        }

        protected override int GetEntityId(CardsDto dto)
        {
            return dto.Id;
        }

        [HttpPost]
        public override async Task<IActionResult> Create([FromBody] CardsDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var createdEntity = await _cardsBusiness.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = GetEntityId(createdEntity) }, createdEntity);
            }
            catch (DuplicateCardException ex)
            {
                _logger.LogWarning("Error de duplicación al crear tarjeta: " + string.Join(", ", ex.Errores));
                return Conflict(new { mensaje = "Ya existen campos duplicados.", errores = ex.Errores });
            }
            catch (ArgumentException ex)
            {
                _logger.LogError($"Error de validación al crear tarjeta: {ex.Message}");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear tarjeta: {ex.Message}");
                return StatusCode(500, "Error interno del servidor");
            }
        }
    }
}