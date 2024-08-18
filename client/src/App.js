import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State variables
  const [name, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  // Fetch phone numbers on mount
  useEffect(() => {
    getPhoneNumbers();
  }, []);

  // Fetch all phone numbers from the server
  const getPhoneNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-phone');
      setPhoneNumbers(response.data.data.phoneNumbers);
    } catch (err) {
      console.error(err);
    }
  };

  // Add or update phone number based on whether updateId is set
  const addOrUpdatePhoneNumber = async () => {
    if (name && phoneNumber) {
      if (updateId) {
        // Update phone number
        try {
          await axios.patch(`http://localhost:8000/update-phone/${updateId}`, {
            name,
            phoneNumber,
          });
          setUpdateId(null);
          setName('');
          setPhone('');
          getPhoneNumbers();
        } catch (err) {
          console.error(err);
        }
      } else {
        // Add phone number
        try {
          await axios.post('http://localhost:8000/add-phone', {
            name,
            phoneNumber,
          });
          setName('');
          setPhone('');
          getPhoneNumbers();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  // Delete a phone number by id
  const deletePhoneNumber = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete-phone/${id}`);
      getPhoneNumbers();
    } catch (err) {
      console.error(err);
    }
  };

  // Update state with the selected phone number
  const updatePhoneNumber = (phoneNumber) => {
    setUpdateId(phoneNumber._id);
    setName(phoneNumber.name);
    setPhone(phoneNumber.phoneNumber);
  };

  // Clear state and cancel update
  const cancelUpdate = () => {
    setUpdateId(null);
    setName('');
    setPhone('');
  };

  // Render the component
  return (
    <div className="container">
      <div className="phonebook">
        <h1>PhoneBook</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          addOrUpdatePhoneNumber();
        }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="form-buttons">
            <button type="submit">
              {updateId ? 'Update' : 'Add'}
            </button>
            {updateId && (
              <button type="button" className="cancel" onClick={cancelUpdate}>
                Cancel
              </button>
            )}
          </div>
        </form>
        <br />
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {phoneNumbers.map((phoneNumber) => (
              <tr key={phoneNumber._id}>
                <td>
                  <button className="action-button edit-button" onClick={() => updatePhoneNumber(phoneNumber)}>Edit</button>
                  <button className="action-button delete-button" onClick={() => deletePhoneNumber(phoneNumber._id)}>Delete</button>
                </td>
                <td>{phoneNumber.name}</td>
                <td>{phoneNumber.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
