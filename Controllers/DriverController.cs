using Microsoft.AspNetCore.Mvc;
using CRUD.Models;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using CRUD.Repositories.DriverRepo;
using Microsoft.Extensions.Configuration;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DriverRepo _driverRepo;

        public DriverController(IConfiguration configuration)
        {
            _configuration = configuration;
            string connectionString = _configuration.GetConnectionString("DefaultConnection"); // Retrieve connection string from app settings
            _driverRepo = new DriverRepo(connectionString);
        }

        [HttpGet("getDrivers")]
        public async Task<IActionResult> GetDrivers()
        {
            try
            {
                var result = await _driverRepo.GetAll();

                if (result == null)
                {
                    return BadRequest();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
