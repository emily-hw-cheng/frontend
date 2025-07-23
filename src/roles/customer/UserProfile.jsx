import React from 'react';

export default function UserProfile() {
  const profile = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    phoneNumber: '123-456-7890',
    customerId: '123',
    accountStatus: 'Active',
    dateJoined: '2023-01-01',
    lastLoggedIn: '2023-07-23',
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <ul>
        <li>First Name: {profile.firstName}</li>
        <li>Last Name: {profile.lastName}</li>
        <li>Address: {profile.address}</li>
        <li>Phone Number: {profile.phoneNumber}</li>
        <li>Customer ID: {profile.customerId}</li>
        <li>Account Status: {profile.accountStatus}</li>
        <li>Date Joined: {profile.dateJoined}</li>
        <li>Last Logged In: {profile.lastLoggedIn}</li>
      </ul>
    </div>
  );
}