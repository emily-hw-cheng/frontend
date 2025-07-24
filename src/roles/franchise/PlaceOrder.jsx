import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemsByType } from '../../services/api'; // Use getItemsByType

export default function PlaceOrder() {
  const { franchiseId } = useParams();
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        // Fetch items by type 1 (supplies)
        const itemsArray = await getItemsByType(1);
        console.log('Items by type API response:', itemsArray);

        // Map to required fields
        const supplies = itemsArray.data
          .map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity // Adjust if quantity is named differently
          }));

        setSupplies(supplies);
      } catch (err) {
        setError('Failed to fetch supplies.');
      } finally {
        setLoading(false);
      }
    };

    fetchSupplies();
  }, [franchiseId]);

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

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    console.log('Order Summary:', order);
    setOrder([]); // Clear the order summary after placing the order
  };

  const handleBackToDashboard = () => {
    navigate("/franchise/:franchiseId/dashboard"); // Navigate back to the dashboard
  };

  if (loading) return <p>Loading supplies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Place Order</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Available Supplies</h3>
        <ul>
          {supplies.map((supply, index) => (
            <li key={supply.id || `supply-${index}`} className="border-b py-4 flex justify-between items-center">
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
      <div>
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
        <ul>
          {order.map((item, index) => (
            <li key={item.id || `order-${index}`} className="border-b py-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        {order.length > 0 && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        )}
      </div>
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mt-8"
        onClick={handleBackToDashboard}
      >
        Back to Dashboard
      </button>
    </div>
  );
}