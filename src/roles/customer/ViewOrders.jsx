import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCustomerOrders } from '../../services/api'; // Use the API function

export default function ViewOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const custID = localStorage.getItem('custID'); // Automatically retrieve custID from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!custID) {
          console.error('Customer ID not found in localStorage');
          return;
        }
        const data = await fetchCustomerOrders(custID); // Use the API function
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [custID]);

  const calculateSubtotal = () => {
    return orders.reduce((total, order) => total + parseFloat(order.total), 0).toFixed(2);
  };

  const handleBackToDashboard = () => {
    navigate('/customer/dashboard');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>
      {orders.length > 0 ? (
        <>
          <ul>
            {orders.map((order, index) => (
              <li key={index} className="border-b py-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold">Order ID: {order.id}</h4>
                  <p className="text-sm text-gray-600">Items: {order.items}</p>
                  <p className="text-sm text-gray-600">Total: ${order.total}</p>
                  <p className="text-sm text-gray-600">Date: {order.date}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-bold">Subtotal: ${calculateSubtotal()}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-600">No orders found.</p>
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