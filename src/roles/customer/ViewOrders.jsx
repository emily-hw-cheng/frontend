import React, { useEffect, useState } from 'react';
import { fetchCustomerOrder } from '../../services/api';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get customerId from localStorage
  const customerId = localStorage.getItem('custID');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!customerId) {
          setError('Customer ID not found. Please log in again.');
          setLoading(false);
          return;
        }
        // Fetch orders for this customer
        const response = await fetchCustomerOrder(customerId);
        setOrders(Array.isArray(response) ? response : response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

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
              <div className="ml-4">
                <strong>Items:</strong>
                <ul>
                  {(order.orderItems || []).map((item, idx) => (
                    <li key={item.franchiseItemId || idx}>
                      Item Name: {item.itemName}
                      Quantity: {item.quantity}
                      Subtotal: {item.subTotal}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}