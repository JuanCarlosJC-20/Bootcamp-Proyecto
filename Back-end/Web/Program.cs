using Back_end.Context;
using Business.Implements;
using Business.Interfaces;
using Data.Implements;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Utilities.Mappers;
using Back_end.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// AutoMapper
builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile));

// Data Layer - Registrar tanto las interfaces específicas como IBaseData<T>
builder.Services.AddScoped<ICardsData, CardsData>();
builder.Services.AddScoped<IBaseData<Cards>, CardsData>();

builder.Services.AddScoped<IGameData, GameData>();
builder.Services.AddScoped<IBaseData<Game>, GameData>();

builder.Services.AddScoped<IRoomData, RoomData>();
builder.Services.AddScoped<IBaseData<Room>, RoomData>();

builder.Services.AddScoped<IRoundData, RoundData>();
builder.Services.AddScoped<IBaseData<Round>, RoundData>();

builder.Services.AddScoped<ITurnData, TurnData>();
builder.Services.AddScoped<IBaseData<Turn>, TurnData>();

// Business Layer
builder.Services.AddScoped<ICardsBusiness, CardsBusiness>();
builder.Services.AddScoped<IGameBusiness, GameBusiness>();
builder.Services.AddScoped<IRoomBusiness, RoomBusiness>();
builder.Services.AddScoped<IRoundBusiness, RoundBusiness>();
builder.Services.AddScoped<ITurnBusiness, TurnBusiness>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();