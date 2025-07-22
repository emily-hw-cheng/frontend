import React, { useEffect, useState } from 'react';
import { getFranchises, addFranchise, removeFranchise } from '../../services/franchiseService';

export default function ManageFranchises() {
  const [franchises, setFranchises] = useState([]);
  const [newFranchise, setNewFranchise] = useState({
    name: '',
    location: '',
    status: 'active',
    operatingHours: '',
  });

  useEffect(() => {
    getFranchises().then(setFranchises);
  }, []);

  const handleAddFranchise = async () => {
    const addedFranchise = await addFranchise(newFranchise);
    setFranchises([...franchises, addedFranchise]);
    setNewFranchise({ name: '', location: '', status: 'active', operatingHours: '' });
  };

  const handleRemoveFranchise = async (id) => {
    await removeFranchise(id);
    setFranchises(franchises.filter(f => f.id !== id));
  };

  return (
    <div>
      <h2>Manage Franchises</h2>
      <ul>
        {franchises.map(f => (
          <li key={f.id}>
            {f.name} - {f.location} - {f.status} - {f.operatingHours}
            <button onClick={() => handleRemoveFranchise(f.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Add Franchise</h3>
      <input
        type="text"
        placeholder="Name"
        value={newFranchise.name}
        onChange={(e) => setNewFranchise({ ...newFranchise, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={newFranchise.location}
        onChange={(e) => setNewFranchise({ ...newFranchise, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="Operating Hours"
        value={newFranchise.operatingHours}
        onChange={(e) => setNewFranchise({ ...newFranchise, operatingHours: e.target.value })}
      />
      <select
        value={newFranchise.status}
        onChange={(e) => setNewFranchise({ ...newFranchise, status: e.target.value })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button onClick={handleAddFranchise}>Add Franchise</button>
    </div>
  );
}