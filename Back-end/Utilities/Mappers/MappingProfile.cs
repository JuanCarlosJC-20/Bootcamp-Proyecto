using AutoMapper;
using Back_end.Dto.CardsDto;
using Back_end.Dto.GameDto;
using Back_end.Dto.PlayerCardDto;
using Back_end.Dto.PlayerDto;
using Back_end.Dto.RaundDto;
using Back_end.Dto.RoomDto;
using Back_end.Dto.TurnDto;
using Back_end.Model;


namespace Utilities.Mappers
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Cards, CardsDto>().ReverseMap();
            CreateMap<Game, GameDto>().ReverseMap();
            CreateMap<Room, RoomDto>().ReverseMap();
            CreateMap<Round, RoundDto>().ReverseMap();
            CreateMap<Turn, TurnDto>().ReverseMap();
            CreateMap<Player, PlayerDto>().ReverseMap();
            CreateMap<PlayerCard, PlayerCardDto>().ReverseMap();
        }
    }
}
