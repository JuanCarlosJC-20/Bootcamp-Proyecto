using AutoMapper;
using Back_end.Dto.GameDto;
using Back_end.Dto.PlayerDto;
using Back_end.Dto.RoomDto;
using Back_end.Model;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Interfaces;
using Microsoft.Extensions.Logging;
using Utilities.Helpers;
using Back_end.Context;
using Microsoft.EntityFrameworkCore;

namespace Business.Implements
{
    public class RoomBusiness : BaseBusiness<Room, RoomDto>, IRoomBusiness
    {
        private readonly IGameBusiness _gameBusiness;
        private readonly IPlayerBusiness _playerBusiness;
        private readonly ApplicationDbContext _context;

        public RoomBusiness(
            IBaseData<Room> data,
            IMapper mapper,
            ILogger<RoomBusiness> logger,
            IGameBusiness gameBusiness,
            IPlayerBusiness playerBusiness,
            ApplicationDbContext context
        ) : base(data, mapper, logger)
        {
            _gameBusiness = gameBusiness;
            _playerBusiness = playerBusiness;
            _context = context;
        }

        public async Task<CompleteRoomResponseDto> CreateCompleteRoomAsync(CreateCompleteRoomDto dto)
        {
            _logger.LogInformation("Iniciando creación completa de sala: {RoomName} con {NumPlayers} jugadores", 
                dto.RoomName, dto.NumPlayers);

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // 1. Crear la sala
                var roomDto = new RoomDto
                {
                    RoomName = dto.RoomName,
                    NumPlayers = dto.NumPlayers
                };

                var createdRoom = await CreateAsync(roomDto);
                _logger.LogInformation("Sala creada con ID: {RoomId}", createdRoom.Id);

                // 2. Crear el juego asociado a la sala
                var gameDto = new GameDto
                {
                    GameTime = DateTime.UtcNow,
                    IdPlayerWinner = 0,
                    IdRoom = createdRoom.Id
                };

                var createdGame = await _gameBusiness.CreateAsync(gameDto);
                _logger.LogInformation("Juego creado con ID: {GameId}", createdGame.Id);

                // 3. Generar nombres aleatorios para los jugadores
                var playerNames = PlayerNameGenerator.GenerateRandomNames(dto.NumPlayers);
                _logger.LogInformation("Nombres generados para jugadores: {PlayerNames}", 
                    string.Join(", ", playerNames));

                // 4. Crear todos los jugadores
                var createdPlayers = new List<PlayerDto>();
                for (int i = 0; i < playerNames.Count; i++)
                {
                    var playerDto = new PlayerDto
                    {
                        NamePlayer = playerNames[i],
                        IdGame = createdGame.Id
                    };

                    var createdPlayer = await _playerBusiness.CreateAsync(playerDto);
                    createdPlayers.Add(createdPlayer);
                    _logger.LogDebug("Jugador {PlayerNumber} creado: {PlayerName} con ID: {PlayerId}", 
                        i + 1, playerNames[i], createdPlayer.Id);
                }

                await transaction.CommitAsync();
                _logger.LogInformation("Creación completa de sala exitosa. Sala: {RoomId}, Juego: {GameId}, Jugadores: {PlayerCount}", 
                    createdRoom.Id, createdGame.Id, createdPlayers.Count);

                return new CompleteRoomResponseDto
                {
                    Room = createdRoom,
                    Game = createdGame,
                    Players = createdPlayers
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Error al crear sala completa: {ErrorMessage}", ex.Message);
                throw;
            }
        }
    }
}