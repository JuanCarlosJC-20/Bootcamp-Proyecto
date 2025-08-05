using AutoMapper;
using Back_end.Dto.CardsDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;
using Utilities.Exceptions;

namespace Business.Implements
{
    public class CardsBusiness : BaseBusiness<Cards, CardsDto>, ICardsBusiness
    {
        public readonly ICardsData _cardsData;
        public CardsBusiness(
            IBaseData<Cards> data,
            ICardsData cardsData,
            IMapper mapper,
            ILogger<CardsBusiness> logger
        ) : base(data, mapper, logger)
        {
            _cardsData = cardsData; 
        }

        public override async Task<CardsDto> CreateAsync(CardsDto dto)
        {
            _logger.LogInformation("Validando que los campos sean unicos para nueva carta: {Name}", dto.Name);
            var errores = new List<string>();

            var camposUnicos = new Dictionary<string, object>
            {
                { "Name", dto.Name }, // El nombre debe ser único
                { "Image", dto.Image }, // La imagen debe ser única
                { "Health", dto.Health }, // La salud debe ser única
                { "Damage", dto.Damage }, // El daño debe ser único
                { "Endurance", dto.Endurance }, // La resistencia debe ser única
                { "Power", dto.Power }, // El poder debe ser único
                { "Scope", dto.Scope } // El alcance debe ser único
            };

            // Mensajes personalizados para cada campo
            var mensajesError = new Dictionary<string, string>
            {
                { "Name", "nombre" },
                { "Image", "imagen" },
                { "Health", "cantidad de salud" },
                { "Damage", "cantidad de daño" },
                { "Endurance", "resistencia" },
                { "Power", "poder" },
                { "Scope", "alcance" }
            };

            foreach (var campo in camposUnicos)
            {
                _logger.LogDebug("Validando campo {Campo} con valor {Valor}", campo.Key, campo.Value);
                
                if (await _cardsData.ExistsByPropertyAsync(campo.Key, campo.Value))
                {
                    var nombreCampo = mensajesError.ContainsKey(campo.Key) ? mensajesError[campo.Key] : campo.Key.ToLower();
                    var mensajeError = $"Ya existe una carta con {nombreCampo}: '{campo.Value}'";
                    errores.Add(mensajeError);
                    _logger.LogWarning("Campo duplicado encontrado: {Error}", mensajeError);
                }
            }

            if (errores.Any())
            {
                _logger.LogWarning("Validación fallida. Errores encontrados: {Errores}", string.Join(", ", errores));
                throw new DuplicateCardException(errores);
            }

            _logger.LogInformation("Validación exitosa. Creando nueva carta: {Name}", dto.Name);
            var entity = _mapper.Map<Cards>(dto);
            await _data.CreateAsync(entity);
            return _mapper.Map<CardsDto>(entity);
        }
    }
}