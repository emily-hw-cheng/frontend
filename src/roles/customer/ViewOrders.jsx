import React, { useEffect, useState } from 'react';
import { fetchFranchiseOrders } from '../../services/api';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get franchiseId from localStorage
  const franchiseId = localStorage.getItem('franchiseId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!franchiseId) {
          setError('Franchise ID not found. Please select a franchise.');
          setLoading(false);
          return;
        }
        const response = await fetchFranchiseOrders(franchiseId);
        setOrders(response.data || response); // Adjust based on your API response
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [franchiseId]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={order.orderId || index} className="border-b py-4">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Date:</strong> {order.time}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              {/* Add more order details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}