import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    country: ''
  });

  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      // Display the submitted data on the webpage
      setSubmittedData(formData);

      // Clear the form inputs
      setFormData({
        name: '',
        street: '',
        city: '',
        country: ''
      });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name} // Bind value to the input field
          onChange={handleChange}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street} // Bind value to the input field
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city} // Bind value to the input field
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country} // Bind value to the input field
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display the submitted data */}
      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <p>Name: {submittedData.name}</p>
          <p>Street: {submittedData.street}</p>
          <p>City: {submittedData.city}</p>
          <p>Country: {submittedData.country}</p>
        </div>
      )}
    </div>
  );
};

export default App;
