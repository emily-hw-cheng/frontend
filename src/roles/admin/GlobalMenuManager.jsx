import React, { useState } from 'react';
import { useGlobalData } from '../../context/GlobalDataContext';

export default function GlobalMenuManager() {
  const { menuItems, supplies, addMenuItem, removeMenuItem, addSupply, removeSupply } = useGlobalData();
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', image: '', description: '', dietaryRestrictions: '' });
  const [newSupply, setNewSupply] = useState({ name: '', quantity: 0 });

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price && newMenuItem.image) {
      addMenuItem(newMenuItem);
      setNewMenuItem({ name: '', price: '', image: '', description: '', dietaryRestrictions: '' });
    } else {
      alert('Please fill out all required fields for the menu item.');
    }
  };

  const handleAddSupply = () => {
    if (newSupply.name && newSupply.quantity > 0) {
      addSupply(newSupply);
      setNewSupply({ name: '', quantity: 0 });
    } else {
      alert('Please provide a valid supply name and quantity.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Global Menu Manager</h2>

      {/* Menu Management Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Manage Menu Items</h3>
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
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500">Dietary: {item.dietaryRestrictions}</p>
                  <p className="text-sm text-gray-800 font-semibold">${item.price}</p>
                </div>
              </div>
              <button
                className="text-red-600 hover:bg-red-100 px-3 py-1 rounded"
                onClick={() => removeMenuItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            value={newMenuItem.name}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newMenuItem.price}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Image Path (e.g., /images/item.png)"
            value={newMenuItem.image}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newMenuItem.description}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Dietary Restrictions"
            value={newMenuItem.dietaryRestrictions}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, dietaryRestrictions: e.target.value })}
            className="border p-2 mr-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleAddMenuItem}
          >
            Add Menu Item
          </button>
        </div>
      </div>

      {/* Supplies Management Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Manage Supplies</h3>
        <ul>
          {supplies.map(supply => (
            <li key={supply.id} className="border-b py-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold">{supply.name}</h4>
                <p className="text-sm text-gray-600">Quantity: {supply.quantity}</p>
              </div>
              <button
                className="text-red-600 hover:bg-red-100 px-3 py-1 rounded"
                onClick={() => removeSupply(supply.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Supply Name"
            value={newSupply.name}
            onChange={(e) => setNewSupply({ ...newSupply, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newSupply.quantity}
            onChange={(e) => setNewSupply({ ...newSupply, quantity: parseInt(e.target.value) })}
            className="border p-2 mr-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleAddSupply}
          >
            Add Supply
          </button>
        </div>
      </div>
    </div>
  );
}