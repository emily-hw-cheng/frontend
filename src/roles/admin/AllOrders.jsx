import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../services/api';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching all orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <h3 className="text-2xl font-semibold mb-4">All Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border-b py-4">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Customer ID:</strong> {order.customerId}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Date:</strong> {order.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}