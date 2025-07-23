import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FranchiseDashboard() {
  const { franchiseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Franchise Dashboard - ID: {franchiseId}</h2>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
        onClick={() => navigate(`/franchise/${franchiseId}/view-supplies`)}
      >
        View Supplies
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
        onClick={() => navigate(`/franchise/${franchiseId}/place-order`)}
      >
        Place Order
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        onClick={() => navigate(`/franchise/${franchiseId}/view-menu-items`)}
      >
        View Menu Items
      </button>
    </div>
  );
}