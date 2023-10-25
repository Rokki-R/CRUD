import React, { useState, useEffect } from 'react';
import { variables } from './Variables';
import './HomePage.css'; // Import your custom CSS file

function HomePage() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await fetch(variables.API_URL + 'Driver/getDrivers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    }

    fetchDrivers();
  }, []);

  return (
    <div className="container col-md-6">
      <center><h1 className="mt-4">Drivers List</h1></center>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Team</th>
            <th>Contract Expiration</th>
            {/* Add other table headers here */}
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.surname}</td>
              <td>{driver.age}</td>
              <td>{driver.date_of_birth}</td>
              <td>{driver.team}</td>
              <td>{driver.contract_expiration}</td>
              {/* Add other table cells for driver attributes */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
