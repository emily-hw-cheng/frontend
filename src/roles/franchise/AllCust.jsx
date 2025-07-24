import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFranchiseOrders } from '../../services/api';

export default function AllCust() {
  const { franchiseId } = useParams();

  const [customerList, setCustomerList] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!franchiseId) {
        console.error('Franchise ID is missing.');
        return;
      }
      try {
        console.log('Fetching orders for franchiseId:', franchiseId);
        const orders = await fetchFranchiseOrders(franchiseId);
        console.log('API response:', orders);
        const safeOrders = Array.isArray(orders) ? orders : [];
        setOrderHistory(safeOrders);
        // Extract unique customers from orders
        const customers = [];
        safeOrders.forEach(order => {
          if (order.customer && !customers.some(c => c.id === order.customer.id)) {
            customers.push(order.customer);
          }
        });
        setCustomerList(customers);
      } catch (error) {
        console.error('Error fetching franchise orders:', error);
        alert(error?.response?.data?.message || 'Failed to fetch franchise orders.');
      }
    };
    fetchOrders();
  }, [franchiseId]);

  return (
    <div className="center">
      <h2 className="text-3xl font-bold mb-6">Franchise Customers & Order History</h2>
      {!franchiseId ? (
        <p className="text-red-500">Franchise ID is required to view customers.</p>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Customer List</h3>
            <ul>
              {customerList.length === 0 ? (
                <li>No customers found.</li>
              ) : (
                customerList.map((customer) => (
                  <li key={customer.id}>
                    <strong>{customer.name}</strong> ({customer.email})
                  </li>
                ))
              )}
            </ul>
            <h3 className="text-2xl font-semibold mb-4">Order History</h3>
            <ul>
              {orderHistory.length === 0 ? (
                <li>No orders found.</li>
              ) : (
                orderHistory.map((order) => (
                  <li key={order.id} className="border-b py-4">
                    <div>
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Date:</strong> {order.date}</p>
                      <p><strong>Total:</strong> ${order.total}</p>
                      <p><strong>Customer:</strong> {order.customer?.name}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}