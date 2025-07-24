import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFranchises } from '../../services/api'; // <-- Use this

export default function SelectFranchise() {
  const [franchises, setFranchises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const response = await getAllFranchises(); // <-- Call correct API
        console.log('Raw API Response:', response); // <-- Add this line
        if (Array.isArray(response)) {
          const apiFranchises = response.map((franchise) => ({
            id: franchise.franchiseId,
            name: franchise.franchiseName,
            location: franchise.address,
          }));
          setFranchises(apiFranchises);
        } else if (response.data && Array.isArray(response.data)) {
          const apiFranchises = response.data.map((franchise) => ({
            id: franchise.franchiseId,
            name: franchise.franchiseName,
            location: franchise.address,
          }));
          setFranchises(apiFranchises);
        } else {
          console.error('API response error:', response.message);
        }
      } catch (error) {
        console.error('Error fetching franchises:', error.message || error);
      }
    };

    fetchFranchises();
  }, []);

  const handleSelectFranchise = (franchiseId) => {
    localStorage.setItem('franchiseId', franchiseId);
    navigate('/customer/dashboard');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Select Franchise</h2>
      <ul>
        {franchises.map((franchise) => (
          <li key={franchise.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold">{franchise.name}</h4>
              <p className="text-sm text-gray-600">{franchise.location}</p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => handleSelectFranchise(franchise.id)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}