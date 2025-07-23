import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ViewOrders() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || {}; // Retrieve cart data from state

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleBackToDashboard = () => {
    navigate('/customer/dashboard');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Order Items</h2>
      {cart && cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="border-b py-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-bold">Subtotal: ${calculateSubtotal()}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-600">No items in your order.</p>
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