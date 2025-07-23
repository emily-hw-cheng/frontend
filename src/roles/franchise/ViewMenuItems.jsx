import React from 'react';
import { useGlobalData } from '../../context/GlobalDataContext';
import { useParams } from 'react-router-dom';

export default function ViewMenuItems() {
  const { franchiseId } = useParams(); // Get franchiseId from route params
  const { menuItems } = useGlobalData(); // Get menu items from GlobalDataContext

  console.log('Franchise ID:', franchiseId); // Debugging log
  console.log('Menu Items:', menuItems); // Debugging log

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Menu Items - Franchise ID: {franchiseId}</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id} className="border-b py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}