using MySql.Data.MySqlClient;
using CRUD.Models;
using Org.BouncyCastle.Cms;
using System.Data;
using Serilog;
using System.Configuration;
using System.Data.Common;
using System.Collections.Specialized;
using Microsoft.Extensions.Configuration;

namespace CRUD.Repositories.DriverRepo
{
    public class DriverRepo
    {
        private Serilog.ILogger _logger;
        private readonly string _connectionString;

        public DriverRepo(string connectionString)
        {
            CreateLogger();
            _connectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(_connectionString);
        }

        private void CreateLogger()
        {
            _logger = new LoggerConfiguration()
                .CreateLogger();
        }

        public async Task<List<Driver>> GetAll()
        {
            List<Driver> drivers = new List<Driver>();

            using (var connection = new MySqlConnection(_connectionString))
            {
                using (var command = new MySqlCommand("SELECT * FROM driver", connection))
                {
                    await connection.OpenAsync();
                    var dataTable = new DataTable();
                    using (var dataAdapter = new MySqlDataAdapter(command))
                    {
                        dataAdapter.Fill(dataTable);
                    }

                    // Format the date fields as "yyyy-MM-dd" before returning them
                    drivers = (from DataRow dt in dataTable.Rows
                               select new Driver()
                               {
                                   Id = Convert.ToInt32(dt["id"]),
                                   Name = dt["name"].ToString(),
                                   Surname = dt["surname"].ToString(),
                                   Age = Convert.ToInt32(dt["age"]),
                                   Team = dt["team"].ToString(),
                                   Contract_expiration = Convert.ToDateTime(dt["contract_expiration"]).ToString("yyyy-MM-dd"),
                                   Date_of_birth = Convert.ToDateTime(dt["date_of_birth"]).ToString("yyyy-MM-dd")
                               }).ToList();

                    return drivers;
                }
            }
        }
    }
}
