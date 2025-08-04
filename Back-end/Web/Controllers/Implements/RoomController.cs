using Back_end.Dto.RoomDto;
using Back_end.Model;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Implements;
using Web.Controllers.Interface;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    public class RoomController : BaseController<RoomDto, Room>
    {
        private readonly IRoomBusiness _roomBusiness;

        public RoomController(
            IRoomBusiness business,
            ILogger<RoomController> logger
        ) : base(business, logger)
        {
            _roomBusiness = business;
        }

        protected override int GetEntityId(RoomDto dto)
        {
            return dto.Id;
        }

        [HttpPost("create-complete-room")]
        public async Task<IActionResult> CreateCompleteRoom([FromBody] CreateCompleteRoomDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                _logger.LogInformation("Solicitud de creación de sala completa recibida: {RoomName}", dto.RoomName);

                var result = await _roomBusiness.CreateCompleteRoomAsync(dto);

                _logger.LogInformation("Sala completa creada exitosamente: {RoomId}", result.Room.Id);

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError($"Error de validación al crear sala completa: {ex.Message}");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear sala completa: {ex.Message}");
                return StatusCode(500, "Error interno del servidor");
            }
        }
    }
}