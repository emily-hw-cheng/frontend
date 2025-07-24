import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../../services/api';

export default function CustPlaceOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState('Takeout'); // Default order type

  // Get franchiseId from localStorage
  const franchiseId = localStorage.getItem('franchiseId');

  const handlePlaceOrder = async () => {
    try {
      const custID = localStorage.getItem('custID');
      if (!custID) {
        alert('Customer ID not found. Please log in again.');
        return;
      }
      if (!franchiseId) {
        alert('Franchise ID not found. Please select a franchise.');
        return;
      }
      if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
      }

      const orderData = {
        FranchiseId: franchiseId,
        CustomerId: custID,
        OrderItems: cart.map(item => ({
          FranchiseItemId: item.id,
          Quantity: item.quantity
        })),
        Address: orderType === 'Delivery' ? deliveryAddress : '',
      };

      console.log('Order payload:', orderData); // Debug

      await createOrder(orderData);

      alert('Order placed successfully!');
      navigate('/customer/view-orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  // Example: In your franchise selection component
  const handleSelectFranchise = (selectedFranchiseId) => {
    localStorage.setItem('franchiseId', selectedFranchiseId);
    // Navigate to place order page
    navigate('/customer/place-order');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Place Your Order</h2>
      {cart.length > 0 ? (
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
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">Select Order Type</h3>
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              value="Takeout"
              checked={orderType === 'Takeout'}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Takeout
          </label>
          <label>
            <input
              type="radio"
              value="Delivery"
              checked={orderType === 'Delivery'}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Delivery
          </label>
        </div>
      </div>
      {orderType === 'Delivery' && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      )}
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}