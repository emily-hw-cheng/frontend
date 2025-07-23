import React, { useState } from 'react';
import { useGlobalData } from '../../context/GlobalDataContext';

export default function ToCart() {
  const { menuItems } = useGlobalData();
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Add to Cart</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-sm text-gray-600">${item.price}</p>
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
      <h3 className="text-2xl font-bold mt-6">Cart</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="border-b py-4">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}