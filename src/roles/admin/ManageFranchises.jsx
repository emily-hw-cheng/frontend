import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllFranchises,
  getFranchiseById,
  addFranchise,
  addFranchiseItem,
  editFranchiseItem,
  getAllItems,
} from '../../services/api';

export default function ManageFranchises() {
  const [franchises, setFranchises] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [newFranchise, setNewFranchise] = useState({ franchiseName: '', address: '' });
  const [itemToAdd, setItemToAdd] = useState({ franchiseName: '', itemName: '' });
  const [itemToEdit, setItemToEdit] = useState({
    franchiseName: '',
    name: '',
    price: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const franchiseData = await getAllFranchises();
      setFranchises(franchiseData);
      const itemData = await getAllItems();
      setItems(itemData);
    };
    fetchData();
  }, []);

  const handleAddFranchise = async () => {
    try {
      const addedFranchise = await addFranchise(newFranchise);
      setFranchises([...franchises, addedFranchise]);
      setNewFranchise({ franchiseName: '', address: '' });
      alert('Franchise added successfully!');
    } catch (error) {
      console.error('Error adding franchise:', error);
      alert('Failed to add franchise.');
    }
  };

  const handleFetchFranchiseDetails = async (franchiseId) => {
    if (!franchiseId) {
      console.error('Franchise ID is missing.');
      return;
    }
    try {
      const response = await getFranchiseById(franchiseId);
      setSelectedFranchise(response.data);
    } catch (error) {
      console.error('Error fetching franchise details:', error);
    }
  };

  const handleAddFranchiseItem = async () => {
    const franchise = franchises.find(f => f.franchiseName.trim().toLowerCase() === itemToAdd.franchiseName.trim().toLowerCase());
    const item = items.find(i => i.name.trim().toLowerCase() === itemToAdd.itemName.trim().toLowerCase());

    if (!franchise || !item) {
      alert('Franchise or Item not found!');
      console.log('Franchise:', franchise, 'Item:', item);
      return;
    }

    try {
      await addFranchiseItem(franchise.franchiseId, item.id);
      alert('Item added to franchise successfully!');
    } catch (error) {
      console.error('Error adding item to franchise:', error);
      if (error.response?.data) {
        console.error('Backend error details:', error.response.data);
        alert(JSON.stringify(error.response.data));
      }
      alert('Failed to add item to franchise.');
    }
  };

  const handleEditFranchiseItem = async () => {
    // Robust name matching
    const franchise = franchises.find(
      f => f.franchiseName.trim().toLowerCase() === itemToEdit.franchiseName.trim().toLowerCase()
    );
    const franchiseId = franchise?.franchiseId;

    const franchiseItem = franchise?.franchiseItems?.find(
      fi => fi.item?.name.trim().toLowerCase() === itemToEdit.name.trim().toLowerCase()
    );
    const franchiseItemId = franchiseItem?.franchiseItemId;
    const itemId = franchiseItem?.item?.id;

    if (!franchiseId || !franchiseItemId || !itemId) {
      alert('Franchise, Item, or Franchise Item not found!');
      console.log('Franchise:', franchise, 'Item:', franchiseItem);
      return;
    }

    const customPrice = Number(itemToEdit.price);
    if (isNaN(customPrice)) {
      alert('Please enter a valid price.');
      return;
    }
    if (customPrice === franchiseItem.customPrice) {
      alert('Price is unchanged.');
      return;
    }

    // CustomColor is required!
    const customColor = franchiseItem.customColor || "";

    console.log('Editing:', {
      FranchiseId: franchiseId,
      FranchiseItemId: franchiseItemId,
      ItemId: itemId,
      CustomColor: customColor,
      CustomPrice: customPrice
    });

    try {
      await editFranchiseItem({
        FranchiseId: franchiseId,
        FranchiseItemId: franchiseItemId,
        ItemId: itemId,
        CustomColor: customColor,
        CustomPrice: customPrice
      });
      alert('Item edited successfully!');
    } catch (error) {
      console.error('Error editing franchise item:', error);
      if (error.response?.data) {
        console.error('Backend error details:', error.response.data);
        alert(JSON.stringify(error.response.data));
      }
      alert('Failed to edit franchise item.');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Manage Franchises</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Franchises</h3>
        <ul>
          {franchises.map((franchise, idx) => (
            <li key={franchise.franchiseId ?? idx}>
              <div>
                <h4 className="font-bold">{franchise.franchiseName}</h4>
                <p className="text-sm text-gray-600">{franchise.address}</p>
              </div>
              {franchise.franchiseId && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={() => handleFetchFranchiseDetails(franchise.franchiseId)}
                >
                  View Details
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-4">Add Franchise</h3>
        <input
          type="text"
          placeholder="Name"
          value={newFranchise.franchiseName}
          onChange={(e) => setNewFranchise({ ...newFranchise, franchiseName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={newFranchise.address}
          onChange={(e) => setNewFranchise({ ...newFranchise, address: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          onClick={handleAddFranchise}
        >
          Add Franchise
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-4">Add Item to Franchise</h3>
        <input
          type="text"
          placeholder="Franchise Name"
          value={itemToAdd.franchiseName}
          onChange={e => setItemToAdd({ ...itemToAdd, franchiseName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Item Name"
          value={itemToAdd.itemName}
          onChange={e => setItemToAdd({ ...itemToAdd, itemName: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          onClick={handleAddFranchiseItem}
        >
          Add Item
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-4">Edit Franchise Item</h3>
        <input
          type="text"
          placeholder="Franchise Name"
          value={itemToEdit.franchiseName}
          onChange={e => setItemToEdit({ ...itemToEdit, franchiseName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Item Name"
          value={itemToEdit.name}
          onChange={e => setItemToEdit({ ...itemToEdit, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Item Price"
          value={itemToEdit.price}
          onChange={e => setItemToEdit({ ...itemToEdit, price: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={handleEditFranchiseItem}
        >
          Edit Item
        </button>
      </div>
      {selectedFranchise && (
        <div className="mb-8 p-4 border rounded bg-white text-black">
          <h3 className="text-xl font-bold mb-2">Franchise Details</h3>
          <p><strong>Name:</strong> {selectedFranchise.franchiseName}</p>
          <p><strong>Address:</strong> {selectedFranchise.address}</p>
          <h4 className="font-semibold mt-2">Items:</h4>
          <ul>
            {selectedFranchise.franchiseItems?.map(item => (
              <li key={item.franchiseItemId}>
                {item.item?.name} - ${item.customPrice}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mt-4"
        onClick={handleBackToDashboard}
      >
        Back to Dashboard
      </button>
    </div>
  );
}