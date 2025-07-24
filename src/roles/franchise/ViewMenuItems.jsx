import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFranchiseById, addFranchiseItem, deleteFranchiseItemById } from '../../services/api';

export default function ViewMenuItems({ franchiseId: propFranchiseId }) {
  // Use franchiseId from props or from URL params
  const params = useParams();
  const franchiseId = propFranchiseId || params.franchiseId;

  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    dietaryRestrictions: '',
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!franchiseId) {
        console.error('Franchise ID is missing.');
        return;
      }
      try {
        const franchise = await getFranchiseById(franchiseId);
        setMenuItems(franchise.menuItems || []);
      } catch (error) {
        console.error('Error fetching menu items:', error.response?.data || error.message);
      }
    };
    fetchMenuItems();
  }, [franchiseId]);

  const handleAddMenuItem = async () => {
    try {
      const addedItem = await addFranchiseItem(franchiseId, newMenuItem);
      setMenuItems([...menuItems, addedItem]);
      setNewMenuItem({ name: '', price: '', image: '', description: '', dietaryRestrictions: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleRemoveMenuItem = async (itemId) => {
    try {
      await deleteFranchiseItemById(itemId);
      setMenuItems(menuItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing menu item:', error);
    }
  };

  return (
    <div className="center">
      <h2 className="text-3xl font-bold mb-6">Franchise Menu Manager</h2>
      {!franchiseId ? (
        <p className="text-red-500">Franchise ID is required to view menu items.</p>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Manage Franchise Menu Items</h3>
            <ul>
              {menuItems.map((item) => (
                <li key={item.id} className="border-b py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
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
        </>
      )}
    </div>
  );
}