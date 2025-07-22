import React, { useEffect, useState } from 'react';
import { getUsers, addUser, removeUser } from '../../services/userService';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    status: 'active',
    dateJoined: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleAddUser = async () => {
    const addedUser = await addUser(newUser);
    setUsers([...users, addedUser]);
    setNewUser({ firstName: '', lastName: '', address: '', phone: '', status: 'active', dateJoined: '' });
  };

  const handleRemoveUser = async (id) => {
    await removeUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.firstName} {u.lastName} - {u.address} - {u.phone} - {u.status} - Joined: {u.dateJoined}
            <button onClick={() => handleRemoveUser(u.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Add User</h3>
      <input
        type="text"
        placeholder="First Name"
        value={newUser.firstName}
        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={newUser.lastName}
        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={newUser.address}
        onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newUser.phone}
        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
      />
      <select
        value={newUser.status}
        onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
      >
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
        <option value="pending">Pending Verification</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}