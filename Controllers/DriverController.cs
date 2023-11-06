using Microsoft.AspNetCore.Mvc;
using CRUD.Models;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using CRUD.Repositories.DriverRepo;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Asn1.Ocsp;

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
        [HttpPost("createDriver")]
        public async Task<IActionResult> AddDriver()
        {
            try
            {
                var form = await Request.ReadFormAsync();
                Driver driver = new Driver()
                {
                    Name = form["name"].ToString(),
                    Surname = form["surname"].ToString(),
                    Age = Convert.ToInt32(form["age"]), // Corrected key
                    Team = form["team"].ToString(),
                    Contract_expiration = Convert.ToDateTime(form["contract_expiration"]).ToString("yyyy-MM-dd"),
                    Date_of_birth = Convert.ToDateTime(form["date_of_birth"]).ToString("yyyy-MM-dd"),
                };

                driver.Id = await _driverRepo.CreateDriver(driver);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpDelete("deleteDriver/{driverId}")]
        public async Task<IActionResult> DeleteDriver(int driverId)
        {
            try
            {
                var driver = await _driverRepo.Delete(driverId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getDriver/{driverId}")]
        public async Task<IActionResult> GetDriver(int driverId)
        {
            try
            {
                var driver = await _driverRepo.GetDriver(driverId);
                if (driver == null)
                {
                    return BadRequest();
                }
                return Ok(driver);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateDriver/{driverId}")]
        public async Task<IActionResult> UpdateDriver(int driverId, IFormCollection form)
        {
            try
            {

                var driverToUpdate = new Driver()
                {
                    Id = driverId,
                    Name = form["name"].ToString(),
                    Surname = form["surname"].ToString(),
                    Age = Convert.ToInt32(form["age"]),
                    Date_of_birth = Convert.ToDateTime(form["date_of_birth"]).ToString("yyyy-MM-dd"),
                    Team = form["team"].ToString(),
                    Contract_expiration = Convert.ToDateTime(form["contract_expiration"]).ToString("yyyy-MM-dd")
                };
                bool updated = await _driverRepo.UpdateDriver(driverToUpdate);
                if (updated)
                {
                    return Ok();
                }
                else
                {
                    return NotFound("Driver not found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}