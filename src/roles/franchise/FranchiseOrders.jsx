import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFranchiseOrders, addFranchiseItem, removeFranchiseItem } from '../../services/api';

export default function FranchiseOrders() {
  const navigate = useNavigate();
  const franchiseId = localStorage.getItem('franchiseID'); // Retrieve franchise ID from localStorage
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchFranchiseOrders(franchiseId);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching franchise orders:', error);
      }
    };
    fetchOrders();
  }, [franchiseId]);

  const handleAddItem = async () => {
    try {
      const itemData = { name: newItem.name, price: parseFloat(newItem.price) };
      const updatedItems = await addFranchiseItem(franchiseId, itemData);
      setMenuItems(updatedItems);
      setNewItem({ name: '', price: '' });
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedItems = await removeFranchiseItem(franchiseId, itemId);
      setMenuItems(updatedItems);
      alert('Item removed successfully!');
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Franchise Dashboard</h2>
      <h3 className="text-2xl font-semibold mb-4">Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border-b py-4">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Date:</strong> {order.date}</p>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mt-6 mb-4">Manage Menu Items</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <p><strong>{item.name}</strong> - ${item.price}</p>
            </div>
            <button
              className="text-red-600 hover:bg-red-100 px-3 py-1 rounded"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Item Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}