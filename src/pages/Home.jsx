import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'; // Import Confetti
import '../styles/theme.css'; // Import global styles

export default function Home() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true); // State to control confetti

  return (
    <div className="center bg-pink-100">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} // Confetti pops once
          numberOfPieces={300} // Adjust number of confetti pieces
        />
      )}
      <img
        src="/images/logo.png"
        alt="Frosted Corner Logo"
        className="logo mb-6"
      />
      <h1 className="welcome-text mb-8">
        Welcome to Frosted Corner
      </h1>
      <div className="flex space-x-8">

        <button
          className="bg-green hover:bg-green-accent text-white py-2 px-6 rounded"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="bg-red hover:bg-red-highlight text-white py-2 px-6 rounded"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
}