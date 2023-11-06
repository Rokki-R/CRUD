import React, { useState, useEffect } from 'react';
import { variables } from './Variables';
import { useHistory } from 'react-router-dom';
import './HomePage.css'; // Import your custom CSS file
import axios from 'axios';
///import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function HomePage() {
  const [drivers, setDrivers] = useState([]);
  const history = useHistory();

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

  const handleUpdate = (driverId) => {
    history.push(`update/${driverId}`)

  };

  const handleDelete = async (driverId) => {
    try {
      await axios.delete(variables.API_URL + `Driver/deleteDriver/${driverId}`);
      toast.success('Driver deleted successfully');
  
      setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.id !== driverId));
    } catch (error) {
      console.error('Error deleting driver:', error);
      toast.error('Error deleting driver');
    }
  };

  return (
    <div className="container col-md-7">
      <center><h1 className="mt-4">Drivers List</h1></center>
      <Toaster/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Namse</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Team</th>
            <th>Contract Expiration</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.surname}</td>
              <td>{driver.age}</td>
              <td>{driver.date_of_birth}</td>
              <td>{driver.team}</td>
              <td>{driver.contract_expiration}</td>
              <td>
                <div className="actions-container">
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(driver.id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(driver.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
