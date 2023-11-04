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
        public async Task<int> CreateDriver(Driver driver)
        {
            using MySqlConnection connection = GetConnection();
            await connection.OpenAsync();

            using MySqlCommand command = new MySqlCommand(
                "INSERT INTO driver (name, surname, age, team, contract_expiration, date_of_birth) " +
                "VALUES (@Name, @Surname, @Age, @Team, @Contract_expiration, @Date_of_birth)", connection); // Corrected placeholders

            command.Parameters.AddWithValue("@Name", driver.Name);
            command.Parameters.AddWithValue("@Surname", driver.Surname);
            command.Parameters.AddWithValue("@Age", driver.Age);
            command.Parameters.AddWithValue("@Team", driver.Team);
            command.Parameters.AddWithValue("@Contract_expiration", driver.Contract_expiration);
            command.Parameters.AddWithValue("@Date_of_birth", driver.Date_of_birth);

            await command.ExecuteNonQueryAsync();

            command.CommandText = "SELECT LAST_INSERT_ID()";
            int id = Convert.ToInt32(await command.ExecuteScalarAsync());

            return id;
        }
        public async Task<bool> Delete(int id)
        {
            using MySqlConnection connection = GetConnection();
            using MySqlCommand command = new MySqlCommand(
                "DELETE FROM driver WHERE id=@Id", connection);

            command.Parameters.AddWithValue("@Id", id);

            await connection.OpenAsync();
            await command.ExecuteNonQueryAsync();

            return true;
        }
    }
}
