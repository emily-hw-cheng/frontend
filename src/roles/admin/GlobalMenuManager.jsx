import React, { useEffect, useState } from 'react';
import { getAllItems, addItem, deleteItemById } from '../../services/api'; // Correct API imports

export default function GlobalMenuManager() {
  const [globalMenuItems, setGlobalMenuItems] = useState([]); // Ensure initial state is an array
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    dietaryRestrictions: '',
  });

  // Fetch global menu items on component mount
  useEffect(() => {
    const fetchGlobalMenuItems = async () => {
      try {
        const items = await getAllItems(); // Fetch global items
        setGlobalMenuItems(Array.isArray(items) ? items : []); // Ensure items is an array
      } catch (error) {
        console.error('Error fetching global menu items:', error.response?.data || error.message);
        alert(
          error.response?.data?.message ||
          'Failed to fetch global menu items. Please check your network or contact support.'
        );
      }
    };

    fetchGlobalMenuItems();
  }, []);

  // Add a new global menu item
  const handleAddMenuItem = async () => {
    try {
      const addedItem = await addItem(newMenuItem); // Add global item
      setGlobalMenuItems([...globalMenuItems, addedItem]); // Update state
      setNewMenuItem({ name: '', price: '', image: '', description: '', dietaryRestrictions: '' }); // Reset form
    } catch (error) {
      console.error('Error adding global menu item:', error);
      alert('Failed to add menu item. Please try again.');
    }
  };

  // Remove a global menu item
  const handleRemoveMenuItem = async (itemId) => {
    try {
      await deleteItemById(itemId); // Delete global item
      setGlobalMenuItems(globalMenuItems.filter((item) => item.id !== itemId)); // Update state
    } catch (error) {
      console.error('Error removing global menu item:', error);
      alert('Failed to remove menu item. Please try again.');
    }
  };

  return (
    <div className="center">
      <h2 className="text-3xl font-bold mb-6">Global Menu Manager</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Menu Items</h3>
        <ul>
          {globalMenuItems.map((item) => (
            <li key={item.id} className="border-b py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageId ? `/images/${item.imageId}` : 'https://via.placeholder.com/150'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500">Dietary: {item.dietaryRestrictions}</p>
                  <p className="text-sm text-gray-800 font-semibold">${item.price}</p>
                </div>
              </div>
              <button
                className="text-red-600 hover:bg-red-100 px-3 py-1 rounded"
                onClick={() => handleRemoveMenuItem(item.id)}
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
    </div>
  );
}