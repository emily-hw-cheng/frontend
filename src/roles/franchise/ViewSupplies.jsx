import React from 'react';
import { useGlobalData } from '../../context/GlobalDataContext';
import { useParams } from 'react-router-dom';

export default function ViewSupplies() {
  const { franchiseId } = useParams(); // Get franchiseId from route params
  const { supplies, removeSupply } = useGlobalData(); // Get supplies from GlobalDataContext

  const handleRemove = (id, quantity) => {
    if (quantity === 0) {
      removeSupply(id);
    } else {
      alert('Cannot remove item. Stock is not empty.');
    }
  };

  console.log('Franchise ID:', franchiseId); // Debugging log
  console.log('Filtered Supplies:', supplies); // Debugging log

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Supplies - Franchise ID: {franchiseId}</h2>
      <ul>
        {supplies.map(supply => (
          <li key={supply.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold">{supply.name}</h4>
              <p className="text-sm text-gray-600">Quantity Available: {supply.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}