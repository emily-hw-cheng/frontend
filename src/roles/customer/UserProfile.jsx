import React from 'react';

export default function UserProfile({ profile }) {
  // Provide default values if profile is not passed
  const defaultProfile = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    phoneNumber: '123-456-7890',
    customerId: '61222',
    accountStatus: 'Active',
    dateJoined: '2025-07-24',
    lastLoggedIn: '2025-07-25',
  };

  const user = profile || defaultProfile;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <ul>
        <li>First Name: {user.firstName}</li>
        <li>Last Name: {user.lastName}</li>
        <li>Address: {user.address}</li>
        <li>Phone Number: {user.phoneNumber}</li>
        <li>Customer ID: {user.customerId}</li>
        <li>Account Status: {user.accountStatus}</li>
        <li>Date Joined: {user.dateJoined}</li>
        <li>Last Logged In: {user.lastLoggedIn}</li>
      </ul>
    </div>
  );
}