import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { variables } from './Variables';
import './AddDriver.css';

const AddDriver = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [team, setTeam] = useState('');
  const [contract_expiration, setContractExpiration] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [contractExpDateError, setContractExpError] = useState('');
  const history = useHistory();

  function calculateAge(birthDate) {
    const birthdateArray = birthDate.split('-');
    const birthYear = parseInt(birthdateArray[0]);
    const birthMonth = parseInt(birthdateArray[1]);
    const birthDay = parseInt(birthdateArray[2]);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let age = currentYear - birthYear;

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }

    return age;
  }

  function checkFields() {
    let isValid = true;

    // Check if fields are filled
    if (!name || !surname || !date_of_birth || !team || !contract_expiration) {
      toast.error('Please fill in all fields');
      return false;
    }
    // Check if date of birth format is YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date_of_birth)) {
      setBirthDateError('Date must be provided in YYYY-MM-DD format');
      isValid = false;
    } else {
      setBirthDateError('');
    }
    // Check if contract expiration date format is YYYY-MM-DD
    if (!dateRegex.test(contract_expiration)) {
      setContractExpError('Date must be provided in YYYY-MM-DD format');
      isValid = false;
    } else {
      setContractExpError('');
    }

    // Check if contract expiration date is not earlier than date of birth
    if (dateRegex.test(date_of_birth) && dateRegex.test(contract_expiration)) {
      if (contract_expiration <= date_of_birth) {
        toast.error('Contract expiration date has to be later than date of birth');
        isValid = false;
      }
    }

    return isValid;
  }

  const handleCreate = (event) => {
    event.preventDefault();
    if (checkFields()) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('age', calculateAge(date_of_birth).toString());
      formData.append('date_of_birth', date_of_birth);
      formData.append('team', team);
      formData.append('contract_expiration', contract_expiration);

      axios
        .post(variables.API_URL + 'Driver/createDriver', formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success('Driver creation succeeded!');
            // Clear the input and error message when data is successfully submitted
            setName('');
            setSurname('');
            setDateOfBirth('');
            setTeam('');
            setContractExpiration('');
          } else {
            toast.error('Error');
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error({ error });
        });
    }
  };

  const handleBack = () => {
    history.push('/')
  };

  return (
    <div className="form-container">
      <center>
        <h1>Add driver</h1>
      </center>
      <form>
        <Toaster />
        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="Enter driver's name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="form-input"
          type="text"
          name="surname"
          placeholder="Enter driver's surname"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <input
          className={`form-input ${birthDateError ? 'dateError' : ''}`}
          type="date"
          name="date_of_birth"
          placeholder="Enter driver's date of birth"
          value={date_of_birth}
          onChange={(event) => setDateOfBirth(event.target.value)}
        />
        {birthDateError}
        <input
          className="form-input"
          type="text"
          name="team"
          placeholder="Enter driver's team"
          value={team}
          onChange={(event) => setTeam(event.target.value)}
        />
        <input
          className={`form-input ${contractExpDateError ? 'dateError' : ''}`}
          type="date"
          name="contract_expiration"
          placeholder="Enter driver's contract expiration date"
          value={contract_expiration}
          onChange={(event) => setContractExpiration(event.target.value)}
        />
        {contractExpDateError}
        <div className="form-button-container">
          <button className="form-button add" type="submit" onClick={(event) => handleCreate(event)}>
            Add Driver
          </button>
          <button className="form-button back" type="button" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
