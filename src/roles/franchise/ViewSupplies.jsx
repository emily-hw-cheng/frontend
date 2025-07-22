import React from 'react';
import { useGlobalData } from '../../context/GlobalDataContext';

export default function ViewSupplies() {
  const { supplies } = useGlobalData();

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">View Supplies</h2>
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