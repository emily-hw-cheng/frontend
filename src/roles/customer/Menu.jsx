import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalData } from '../../context/GlobalDataContext';

export default function Menu() {
  const { menuItems } = useGlobalData(); // Get menu items from GlobalDataContext
  const [cart, setCart] = useState([]); // State to manage cart items
  const navigate = useNavigate(); // Navigation hook

  const handleAddToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    // Update URL to indicate success
    navigate('/customer/menu?status=item-added-successfully');
  };

  const handleBackToDashboard = () => {
    navigate('/customer/dashboard');
  };

  const handleProceedToOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to proceed.');
      return;
    }
    navigate('/customer/place-order', { state: { cart } });
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Menu Items</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id} className="border-b py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={item.image} // Use the image property directly
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">Cart</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="border-b py-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4"
            onClick={handleProceedToOrder}
          >
            Proceed to Order
          </button>
        </div>
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