using Newtonsoft.Json;

namespace CRUD.Models
{
    public class Driver
    {
        [JsonProperty("id")]
        public int? Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("surname")]
        public string Surname { get; set; }

        [JsonProperty("age")]
        public int Age { get; set; }

        [JsonProperty("team")]
        public string Team { get; set; }

        [JsonProperty("contract_expiration")]
        public string Contract_expiration { get; set; }

        [JsonProperty("date_of_birth")]
        public string Date_of_birth { get; set;  }

    }
}
