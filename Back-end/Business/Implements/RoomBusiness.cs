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
        private readonly IPlayerCardBusiness _playerCardBusiness;
        private readonly ApplicationDbContext _context;

        public RoomBusiness(
            IBaseData<Room> data,
            IMapper mapper,
            ILogger<RoomBusiness> logger,
            IGameBusiness gameBusiness,
            IPlayerBusiness playerBusiness,
            IPlayerCardBusiness playerCardBusiness,
            ApplicationDbContext context
        ) : base(data, mapper, logger)
        {
            _gameBusiness = gameBusiness;
            _playerBusiness = playerBusiness;
            _playerCardBusiness = playerCardBusiness;
            _context = context;
        }

        public async Task<CompleteRoomResponseDto> CreateCompleteRoomAsync(RoomDto dto)
        {
            _logger.LogInformation("Inicia creación completa de sala: {RoomName} con {NumPlayers} jugadores", 
                dto.RoomName, dto.NumPlayers);

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Crear la sala
                var roomDto = new RoomDto
                {
                    RoomName = dto.RoomName,
                    NumPlayers = dto.NumPlayers
                };

                var createdRoom = await CreateAsync(roomDto);
                _logger.LogInformation("Sala creada con ID: {RoomId}", createdRoom.Id);

                //Crear el game conectado a la sala
                var gameDto = new GameDto
                {
                    GameTime = DateTime.UtcNow,
                    IdPlayerWinner = 0,
                    IdRoom = createdRoom.Id
                };

                var createdGame = await _gameBusiness.CreateAsync(gameDto);
                _logger.LogInformation("Juego creado con ID: {GameId}", createdGame.Id);

                // Generar nombres aleatorios para cada jugadores ssegun meses del año en ingles 
                var playerNames = PlayerNameGenerator.GenerateRandomNames(dto.NumPlayers);
                _logger.LogInformation("Nombres generados para jugadores: {PlayerNames}", 
                    string.Join(", ", playerNames));

                // Crear todos los jugadores con nombres unicos
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

                // Asignar cartas aleatorias a cada  jugador, utilizamos el metodo que esta en playerCardBusinnes de asignar cartas a cada jugador
                _logger.LogInformation("Asignando cartas a todos los jugadores del juego {GameId}", createdGame.Id);
                var assignedCards = await _playerCardBusiness.AssignCardsToPlayersAsync(createdGame.Id, 8);
                _logger.LogInformation("Se asignaron {CardCount} cartas a los jugadores", assignedCards.Count);

                await transaction.CommitAsync();
                _logger.LogInformation("Creación completa de sala exitosa. Sala: {RoomId}, Juego: {GameId}, Jugadores: {PlayerCount}, Cartas asignadas: {CardCount}", 
                    createdRoom.Id, createdGame.Id, createdPlayers.Count, assignedCards.Count);

                return new CompleteRoomResponseDto
                {
                    Room = createdRoom,
                    Game = createdGame,
                    Players = createdPlayers,
                    PlayerCard = assignedCards
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