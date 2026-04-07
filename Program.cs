using EmployeeRequests.Application.Commands;
using EmployeeRequests.Application.Interfaces;
using EmployeeRequests.Infrastructure.Persistence;
using EmployeeRequests.Infrastructure.Repositories;
using FluentValidation;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// 1. Configuración de CORS para React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. CONFIGURACIÓN DE SQLITE (Reemplaza a la base de datos en memoria)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Registro de Inyección de Dependencias
builder.Services.AddScoped<IEmployeeRequestRepository, EmployeeRequestRepository>();
builder.Services.AddScoped<IValidator<CreateEmployeeRequestCommand>, CreateEmployeeRequestValidator>();

var app = builder.Build();

// 4. Middlewares
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Comentado por si no usas certificados locales aún
// app.UseHttpsRedirection(); 

app.UseAuthorization();
app.MapControllers();

app.Run();