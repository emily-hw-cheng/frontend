import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css'; // Import global styles


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
    const requiredFields =
      accountType === 'Franchise'
        ? ['franchiseName', 'location', 'franchiseStatus', 'operatingHours', 'email', 'password']
        : ['firstName', 'lastName', 'address', 'phoneNumber', 'email', 'password'];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert(error);
      return;
    }

    const uniqueId = Math.floor(Math.random() * 100000); // Generate a unique ID
    const data = { ...formData, id: uniqueId, role: accountType.toLowerCase() };

    // Store the submitted data in localStorage for login validation
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...existingUsers, data]));

    alert(`${accountType} account created successfully!`);

    // Redirect to login with pre-filled credentials
    navigate('/login', { state: { email: formData.email, password: formData.password } });
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Registration</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Account Type:</label>
        <select
          value={accountType}
          onChange={(e) => handleAccountTypeChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Select --</option>
          <option value="Franchise">Franchise</option>
          <option value="Customer">Customer</option>
        </select>
      </div>

      {accountType === 'Franchise' && (
        <div className="mb-4">
          <label className="block mb-2">Franchise Name:</label>
          <input
            type="text"
            name="franchiseName"
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <label className="block mb-2 mt-4">Location:</label>
          <input
            type="text"
            name="location"
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <label className="block mb-2 mt-4">Franchise Status:</label>
          <input
            type="text"
            name="franchiseStatus"
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <label className="block mb-2 mt-4">Operating Hours:</label>
          <input
            type="text"
            name="operatingHours"
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
      )}

      {accountType === 'Customer' && (
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
      )}

      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
}