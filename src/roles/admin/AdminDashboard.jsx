import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/theme.css'; // Import global styles

export default function AdminDashboard() {
  const navigate = useNavigate(); // Define navigate using useNavigate
  
  const handleBackToHome = () => {
    navigate('/'); // Adjust the path to your home page route
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="space-y-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate('/admin/global-menu-manager')}
        >
          Menu
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate('/admin/manage-franchises')}
        >
          Manage Franchises
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate('/admin/manage-users')}
        >
          Manage Users
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate('/admin/reports')}
        >
          Reports
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
          onClick={() => navigate('/admin/sales-overview')}
        >
          Sales Overview
        </button>

        <button
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mt-4"
        onClick={handleBackToHome}
      >
        Back to Home Page
      </button>
      
      </div>
    </div>
  );
}