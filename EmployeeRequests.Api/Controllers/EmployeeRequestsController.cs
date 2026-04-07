using EmployeeRequests.Application.Commands;
using EmployeeRequests.Application.Interfaces;
using EmployeeRequests.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeRequests.Api.Controllers;

[ApiController]
[Route("api/requests")]
public class EmployeeRequestsController : ControllerBase
{
    private readonly IEmployeeRequestRepository _repository;
    private readonly IValidator<CreateEmployeeRequestCommand> _validator;

    public EmployeeRequestsController(
        IEmployeeRequestRepository repository,
        IValidator<CreateEmployeeRequestCommand> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    // POST /api/requests
    [HttpPost]
    public async Task<IActionResult> Create(CreateEmployeeRequestCommand command)
    {
        var validationResult = await _validator.ValidateAsync(command);

        if (!validationResult.IsValid)
            return BadRequest(validationResult.Errors);

        var entity = command.ToEntity();
        await _repository.AddAsync(entity);

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
    }

    // GET /api/requests
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var requests = await _repository.GetAllAsync();
        return Ok(requests);
    }

    // GET /api/requests/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var request = await _repository.GetByIdAsync(id);

        if (request == null)
            return NotFound();

        return Ok(request);
    }

    // PUT /api/requests/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, EmployeeRequest updatedRequest)
    {
        var existing = await _repository.GetByIdAsync(id);

        if (existing == null)
            return NotFound();

        existing.EmployeeName = updatedRequest.EmployeeName;
        existing.Type = updatedRequest.Type;
        existing.Description = updatedRequest.Description;
        existing.Status = updatedRequest.Status;

        await _repository.UpdateAsync(existing);

        return NoContent();
    }

    // DELETE /api/requests/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var existing = await _repository.GetByIdAsync(id);

        if (existing == null)
            return NotFound();

        await _repository.DeleteAsync(id);

        return NoContent();
    }
}