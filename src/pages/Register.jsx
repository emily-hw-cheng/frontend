import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {
  const [accountType, setAccountType] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setFormData({});
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'address', 'phoneNumber', 'email', 'password'];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert(error);
      return;
    }

    try {
      // Generate custID for customers
      const custID = `cust-${Math.floor(Math.random() * 100000)}`; // Example custID generation
      const registrationData = { ...formData, custID };

      // Send registration data to backend
      await axios.post('https://your-backend-api-url.com/register', registrationData);

      // Store custID in localStorage
      localStorage.setItem('custID', custID);

      alert('Customer account created successfully!');
      navigate('/login', { state: { email: formData.email, password: formData.password } });
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Customer Registration</h2>
      <div className="mb-4">
        <label className="block mb-2">First Name:</label>
        <input
          type="text"
          name="firstName"
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <label className="block mb-2 mt-4">Last Name:</label>
        <input
          type="text"
          name="lastName"
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <label className="block mb-2 mt-4">Address:</label>
        <input
          type="text"
          name="address"
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <label className="block mb-2 mt-4">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <label className="block mb-2 mt-4">Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <label className="block mb-2 mt-4">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
}