import React, { useState, useEffect } from 'react';
import { getAllMenuItems } from '../../services/api';

export default function ViewMenuItems() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await getAllMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Menu Items</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500">Dietary: {item.dietaryRestrictions}</p>
              <p className="text-sm text-gray-800 font-semibold">${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}