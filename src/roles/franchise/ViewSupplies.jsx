import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItemsByType } from '../../services/api'; // Import getItemsByType

export default function ViewSupplies() {
  const { franchiseId } = useParams();
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        // Fetch items by type 1 (supplies)
        const response = await getItemsByType(1);
        console.log('Supplies data:', response);

        // If response.data is the array
        const items = Array.isArray(response.data) ? response.data : response.data.data;
        setSupplies(items);
      } catch (err) {
        console.error('Error fetching supplies:', err);
        setError('Failed to fetch supplies.');
      } finally {
        setLoading(false);
      }
    };

    fetchSupplies();
  }, [franchiseId]);

  const handleRemove = (id, quantity) => {
    if (quantity === 0) {
      setSupplies(prevSupplies => prevSupplies.filter(supply => supply.id !== id));
      alert('Supply removed successfully.');
    } else {
      alert('Cannot remove item. Stock is not empty.');
    }
  };

  if (loading) return <p>Loading supplies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Supplies Items</h2>
      <ul>
        {supplies.length > 0
          ? supplies.map((supply, index) => (
              <li
                key={supply.id || `supply-${index}`}
                className="border-b py-4 flex flex-col items-start"
              >
                <h4 className="font-bold">{supply.name}</h4>
                <p className="text-sm text-gray-600">Description: {supply.description}</p>
                <p className="text-sm text-gray-600">Price: ${supply.price}</p>
                <p className="text-sm text-gray-600">Quantity Available: {supply.quantity}</p>
              </li>
            ))
          : <li>No supplies found.</li>
        }
      </ul>
    </div>
  );
}