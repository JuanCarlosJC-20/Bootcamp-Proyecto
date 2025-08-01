using Back_end.Context;
using Business.Implements;
using Business.Implements.BaseBusiness;
using Business.Interfaces;
using Data.Implements;
using Data.Implements.Base;
using Data.Implements.BaseData;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Utilities.Mappers;
using Web.ServiceExtension;
using FluentValidation.AspNetCore;
using Swashbuckle.AspNetCore.SwaggerUI; 



var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

// Reemplaza esta línea:
// builder.Services.AddAutoMapper(typeof(MappingProfile));

// Por esta línea:
builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile));
// ...

// Reemplaza la línea problemática por la siguiente, si usas FluentValidation.AspNetCore:
builder.Services.AddControllers()
    .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Program>());

// Elimina o comenta la línea original:
// builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program));


// Swagger
builder.Services.AddSwaggerDocumentation();

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register generic repositories and business logic
builder.Services.AddScoped(typeof(IBaseData<>), typeof(BaseData<>));
builder.Services.AddScoped(typeof(IBaseBusiness<,>), typeof(BaseBusiness<,>));




var app = builder.Build();

// Swagger (solo en desarrollo)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Sistema de Gestión v1");
        c.RoutePrefix = string.Empty;
    });
}

// Usa la política de CORS registrada en ApplicationServiceExtensions
app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();

// Autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Inicializar base de datos y aplicar migraciones
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<ApplicationDbContext>();
        var logger = services.GetRequiredService<ILogger<Program>>();

        dbContext.Database.Migrate();
        logger.LogInformation("Base de datos verificada y migraciones aplicadas exitosamente.");
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error durante la migración de la base de datos.");
    }
}

app.Run();