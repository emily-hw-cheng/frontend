import React from 'react';

export default function ManageUsers({ submittedData }) {
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
    </div>
  );
}