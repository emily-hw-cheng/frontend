import React, { useState } from 'react';
import { useGlobalData } from '../../context/GlobalDataContext';

export default function PlaceOrder() {
  const { supplies } = useGlobalData();
  const [order, setOrder] = useState([]);

  const handleAddToOrder = (supply) => {
    const existingItem = order.find(item => item.id === supply.id);
    if (existingItem) {
      setOrder(order.map(item =>
        item.id === supply.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setOrder([...order, { ...supply, quantity: 1 }]);
    }
  };

  const handleRemoveFromOrder = (id) => {
    setOrder(order.filter(item => item.id !== id));
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Place Order</h2>

      {/* Supplies List */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Available Supplies</h3>
        <ul>
          {supplies.map(supply => (
            <li key={supply.id} className="border-b py-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold">{supply.name}</h4>
                <p className="text-sm text-gray-600">Quantity Available: {supply.quantity}</p>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => handleAddToOrder(supply)}
              >
                Add to Order
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
        <ul>
          {order.map(item => (
            <li key={item.id} className="border-b py-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                className="text-red-600 hover:bg-red-100 px-3 py-1 rounded"
                onClick={() => handleRemoveFromOrder(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}