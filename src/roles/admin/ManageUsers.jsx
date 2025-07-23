import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function ManageUsers({ submittedData }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard'); // Adjust the path based on your routing setup
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
      <ul className="mb-6">
        {submittedData.map((user, index) => (
          <li key={index} className="border-b py-4">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Account Type:</strong> {user.accountType}</p>
            <p><strong>Name:</strong> {user.firstName || user.franchiseName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> {user.franchiseStatus || 'Active'}</p>
            <p><strong>Date Joined:</strong> {user.dateJoined || 'N/A'}</p>
            <p><strong>Last Logged In:</strong> {user.lastLoggedIn || 'N/A'}</p>
          </li>
        ))}
      </ul>
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        onClick={handleBackToDashboard}
      >
        Back to Dashboard
      </button>
    </div>
  );
}