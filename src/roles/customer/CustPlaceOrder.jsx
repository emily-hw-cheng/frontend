import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder, addDeliveryAddressToOrder } from '../../services/api';

export default function CustPlaceOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handlePlaceOrder = async () => {
    try {
      const custID = localStorage.getItem('custID');
      if (!custID) {
        alert('Customer ID not found. Please log in again.');
        return;
      }

      // Create a new order
      const orderData = {
        customerId: custID,
        items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        date: new Date().toISOString(),
      };
      const newOrder = await createOrder(orderData);

      // Add delivery address to the order
      await addDeliveryAddressToOrder(newOrder.id, deliveryAddress);

      alert('Order placed successfully!');
      navigate('/customer/dashboard');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
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
        <input
          type="text"
          placeholder="Delivery Address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}