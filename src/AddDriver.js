import React, { useState } from 'react';
import './AddDriver.css'; // Import your custom CSS file

function DriverForm({ onAddDriver }) {
  const [newDriver, setNewDriver] = useState({
    name: '',
    surname: '',
    age: '',
    date_of_birth: '',
    team: '',
    contract_expiration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDriver({ ...newDriver, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the newDriver object to a function that will handle the creation on the backend
    onAddDriver(newDriver);
    // Clear the form after submission
    setNewDriver({
      name: '',
      surname: '',
      age: '',
      date_of_birth: '',
      team: '',
      contract_expiration: '',
    });
  };

  return (
    <div className="form-container">
        <center><h1>Add driver</h1></center>
      <form onSubmit={handleSubmit}>
        <input className="form-input" type="text" name="name" placeholder = "Enter driver's name" value={newDriver.name} onChange={handleChange}/>
        <input className="form-input" type="text" name="surname" placeholder = "Enter driver's surname" value={newDriver.surname} onChange={handleChange}/>
        <input className="form-input" type="text" name="age" placeholder = "Enter driver's age" value={newDriver.age} onChange={handleChange}/>
        <input className="form-input" type="text" name="date_of_birth" placeholder = "Enter driver's date of birth" value={newDriver.date_of_birth} onChange={handleChange}/>
        <input className="form-input" type="text" name="team" placeholder = "Enter driver's team" value={newDriver.team} onChange={handleChange}/>
        <input className="form-input" type="text" name="contract_expiration" placeholder = "Enter driver's contract expiration date" value={newDriver.contract_expiration} onChange={handleChange}/>
        <center><button className="form-button" type="submit">
          Add Driver
        </button></center>
      </form>
    </div>
  );
  
}

export default DriverForm;
