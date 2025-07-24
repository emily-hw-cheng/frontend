import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustDashboard() {
  const navigate = useNavigate();
  const [franchiseId, setFranchiseId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('franchiseId');
    if (!id) {
      navigate('/customer/select-franchise');
    } else {
      setFranchiseId(id);
    }
  }, [navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        Customer Dashboard - Franchise ID: {franchiseId}
      </h2>
      <div className="space-y-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate(`/customer/menu`)}
        >
          Menu
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate(`/customer/user-profile`)}
        >
          View/Edit User Profile
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate(`/customer/view-orders`)}
        >
          View All Order Items
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate(`/customer/franchise-leaderboard`)}
        >
          Franchise Leaderboard
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mt-4"
          onClick={handleBackToHome}
        >
          Logout
        </button>
      </div>
    </div>
  );
}