import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFranchiseById, addFranchiseItem, deleteFranchiseItemById, editFranchiseItem } from '../../services/api';

export default function ViewMenuItems({ franchiseId: propFranchiseId }) {
  // Use franchiseId from props or from URL params
  const params = useParams();
  const franchiseId = propFranchiseId || params.franchiseId;
  console.log('Franchise ID:', franchiseId);

  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    dietaryRestrictions: '',
  });
  const [franchise, setFranchise] = useState(null);
  const [editFields, setEditFields] = useState({}); // { [franchiseItemId]: { customColor, customPrice } }

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!franchiseId) {
        console.error('Franchise ID is missing.');
        return;
      }
      try {
        const franchiseData = await getFranchiseById(franchiseId);
        setFranchise(franchiseData.data);
        console.log('Franchise data:', franchiseData.data);
        console.log("Franchise" + franchise);
      } catch (error) {
        console.error('Error fetching menu items:', error.response?.data || error.message);
      }
    };
    fetchMenuItems();
  }, [franchiseId]);

  const handleEditChange = (franchiseItemId, field, value) => {
    setEditFields(prev => ({
      ...prev,
      [franchiseItemId]: {
        ...prev[franchiseItemId],
        [field]: value
      }
    }));
  };

  const handleEditFranchiseItem = async (franchiseItem) => {
    const { customColor, customPrice } = editFields[franchiseItem.franchiseItemId] || {};
    if (!customColor || !customPrice) {
      alert('Please enter both custom color and custom price.');
      return;
    }
    try {
      const payload = {
        itemId: franchiseItem.item.id,
        franchiseId: Number(franchiseId),
        CustomColor: customColor.trim(),
        CustomPrice: Number(customPrice)
      };
      console.log('Edit payload:', payload);
      await editFranchiseItem(payload);
      alert('Item edited successfully!');
    } catch (error) {
      console.error('Error editing franchise item:', error.response?.data || error.message);
      alert(JSON.stringify(error.response?.data?.errors || error.message));
    }
  };

  const handleAddMenuItem = async () => {
    try {
      const addedItem = await addFranchiseItem(franchiseId, newMenuItem);
      setMenuItems([...menuItems, addedItem]);
      setNewMenuItem({ name: '', price: '', image: '', description: '', dietaryRestrictions: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  // const handleRemoveMenuItem = async (itemId) => {
  //   try {
  //     await deleteFranchiseItemById(itemId);
  //     setMenuItems(menuItems.filter((item) => item.id !== itemId));
  //   } catch (error) {
  //     console.error('Error removing menu item:', error);
  //   }
  // };

  console.log("Franchise" + franchise);

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
              {franchise?.franchiseItems?.length > 0 ? (
                franchise.franchiseItems.map((franchiseItem) => (
                  <li key={franchiseItem.franchiseItemId} className="border-b py-4 flex flex-col">
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          franchiseItem.item.imageId
                            ? `/images/${franchiseItem.item.imageId}`
                            : franchiseItem.item.image || 'https://via.placeholder.com/150'
                        }
                        alt={franchiseItem.item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-bold">{franchiseItem.item.name}</h4>
                        <p className="text-sm text-gray-600">{franchiseItem.item.description}</p>
                        <p className="text-sm text-gray-500">Dietary: {franchiseItem.item.dietaryRestrictions}</p>
                        <p className="text-sm text-gray-800 font-semibold">Base Price: ${franchiseItem.item.price}</p>
                        <p className="text-sm text-gray-800 font-semibold">Custom Price: ${franchiseItem.customPrice}</p>
                        <p className="text-sm text-gray-800 font-semibold">Custom Color: {franchiseItem.customColor}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <input
                        type="text"
                        placeholder="Custom Color"
                        value={editFields[franchiseItem.franchiseItemId]?.customColor || ''}
                        onChange={e => handleEditChange(franchiseItem.franchiseItemId, 'customColor', e.target.value)}
                        className="border p-2"
                      />
                      <input
                        type="number"
                        placeholder="Custom Price"
                        value={editFields[franchiseItem.franchiseItemId]?.customPrice || ''}
                        onChange={e => handleEditChange(franchiseItem.franchiseItemId, 'customPrice', e.target.value)}
                        className="border p-2"
                      />
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        onClick={() => handleEditFranchiseItem(franchiseItem)}
                      >
                        Save
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li>No menu items found for this franchise.</li>
              )}
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