import React, { useState, useEffect } from 'react';
import { fetchCustomerOrders, fetchFranchiseOrders } from '../../services/api'; // Correct API imports

export default function ManageUsers() {
  const [customerId, setCustomerId] = useState('');
  const [franchiseId, setFranchiseId] = useState('');
  const [orders, setOrders] = useState([]); // State to store orders
  const [viewMode, setViewMode] = useState('customer'); // Toggle between customer and franchise view

  // Fetch orders based on the selected mode
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let result = [];
        if (viewMode === 'customer' && customerId) {
          const customerOrders = await fetchCustomerOrders(customerId);
          result = Array.isArray(customerOrders) ? customerOrders : customerOrders ? [customerOrders] : [];
        } else if (viewMode === 'franchise' && franchiseId) {
          const franchiseOrders = await fetchFranchiseOrders(franchiseId);
          result = Array.isArray(franchiseOrders) ? franchiseOrders : franchiseOrders ? [franchiseOrders] : [];
        }
        setOrders(result);
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        alert(
          error.response?.data?.message ||
          'Failed to fetch orders. Please check your network or contact support.'
        );
      }
    };

    fetchOrders();
  }, [viewMode, customerId, franchiseId]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
      <div className="mb-6">
        <button
          className={`mr-4 py-2 px-4 rounded ${viewMode === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('customer')}
        >
          View Customer Orders
        </button>
        <button
          className={`py-2 px-4 rounded ${viewMode === 'franchise' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('franchise')}
        >
          View Franchise Orders
        </button>
      </div>
      {viewMode === 'customer' && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => setOrders([])} // Clear orders when switching customer
          >
            Fetch Customer Orders
          </button>
        </div>
      )}
      {viewMode === 'franchise' && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Franchise ID"
            value={franchiseId}
            onChange={(e) => setFranchiseId(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => setOrders([])} // Clear orders when switching franchise
          >
            Fetch Franchise Orders
          </button>
        </div>
      )}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Orders</h3>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border-b py-4">
              <div>
                <p className="font-bold">Order ID: {order.id}</p>
                <p className="text-sm text-gray-600">Customer ID: {order.customerId}</p>
                <p className="text-sm text-gray-600">Franchise ID: {order.franchiseId}</p>
                <p className="text-sm text-gray-800 font-semibold">Total: ${order.total}</p>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
              </div>
            </li>
          ))}
        </ul>
        {orders.length === 0 && <p className="text-gray-500">No orders found.</p>}
      </div>
    </div>
  );
}