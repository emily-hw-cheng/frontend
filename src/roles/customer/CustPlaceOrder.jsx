import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CustPlaceOrder() {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const [orderType, setOrderType] = useState('takeout');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const navigate = useNavigate();

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (orderType === 'delivery' && !deliveryAddress) {
      alert('Please provide a delivery address.');
      return;
    }
    const subtotal = calculateSubtotal();
    // Show subtotal and success popup
    alert(`Subtotal: $${subtotal}\nOrder placed successfully!`);
    // Navigate to view orders page
    navigate('/customer/view-orders', { state: { cart, orderType, deliveryAddress } });
  };

  const handleBackToMenu = () => {
    navigate('/customer/menu');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Place Order</h2>
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
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
      </div>
      <div className="mb-4">
        <label className="block mb-2">Order Type:</label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="takeout">Takeout</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>
      {orderType === 'delivery' && (
        <div className="mb-4">
          <label className="block mb-2">Delivery Address:</label>
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      <div className="flex space-x-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          onClick={handleBackToMenu}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}