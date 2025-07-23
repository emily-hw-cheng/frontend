import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css'; // Import global styles

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <img
        src="/images/logo.png"
        alt="Frosted Corner Logo"
        className="w-32 h-32 mb-6" // Reduced size of the logo
      />
      <h1 className="text-4xl font-bold mb-8" style={{ color: 'mintgreen' }}>
        Welcome to Frosted Corner
      </h1>
      <div className="flex space-x-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
}