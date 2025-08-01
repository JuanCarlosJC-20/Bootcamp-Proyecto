using Back_end.Context;
using Business.implement;
using Business.interfaces;
using Data.implement;
using Data.Interfaces;
using Data.Mappings;
using Entity.Contexts;
using Microsoft.EntityFrameworkCore;
using Utilities.Mappers;
using Web.Controllers.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddAutoMapper(typeof(MappingProfile));
// Data Layer
builder.Services.AddScoped<IEmpleadoData, EmpleadoData>();
builder.Services.AddScoped<IProyectoData, ProyectoData>();
builder.Services.AddScoped<ITareaData, TareaData>();

// Business Layer
builder.Services.AddScoped<IEmpleadoBusiness, EmpleadoBusiness>();
builder.Services.AddScoped<IProyectoBusiness, ProyectoBusiness>();
builder.Services.AddScoped<ITareaBusiness, TareaBusiness>();

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

using Utilities.Mappers;
