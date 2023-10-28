import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { variables } from './Variables';
import './AddDriver.css'; // Import your custom CSS file

const AddDriver = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [team, setTeam] = useState('');
  const [contract_expiration, setContractExpiration] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');


  const handleCreate = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('age', age);
    formData.append('date_of_birth', date_of_birth);
    formData.append('team', team);
    formData.append('contract_expiration', contract_expiration);
  
    axios
      .post(variables.API_URL + 'Driver/createDriver', formData)
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          toast.success('Driver creation succeeded!');
        } else {
          toast.error('Error');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Įvyko klaida, susisiekite su administratoriumi!');
      });
  };

  return (
    <div className="form-container">
        <center><h1>Add driver</h1></center>
      <form>
        <input className="form-input" type="text" name="name" placeholder = "Enter driver's name" value = {name} onChange={(event) => setName(event.target.value)}/>
        <input className="form-input" type="text" name="surname" placeholder = "Enter driver's surname" value = {surname} onChange={(event) => setSurname(event.target.value)}/>
        <input className="form-input" type="text" name="age" placeholder = "Enter driver's age" value = {age} onChange={(event) => setAge(event.target.value)}/>
        <input className="form-input" type="text" name="date_of_birth" placeholder = "Enter driver's date of birth" value = {date_of_birth} onChange={(event) => setDateOfBirth(event.target.value)}/>
        <input className="form-input" type="text" name="team" placeholder = "Enter driver's team" value = {team} onChange={(event) => setTeam(event.target.value)}/>
        <input className="form-input" type="text" name="contract_expiration" placeholder = "Enter driver's contract expiration date" value= {contract_expiration} onChange={(event) => setContractExpiration(event.target.value)}/>
        <center><button className="form-button" type="submit" onClick={(event) => handleCreate(event)}>
          Add Driver
        </button></center>
      </form>
    </div>
  );
  
}

export default AddDriver;
