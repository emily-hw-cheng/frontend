import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/theme.css'; // Import global styles

// Hardcoded admin credentials
const adminCredentials = { email: 'admin@frosted.com', password: 'a1', role: 'admin' };

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Pre-fill email and password if passed from registration
    if (location.state) {
      setEmail(location.state.email || '');
      setPassword(location.state.password || '');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Combine admin credentials with registered users
      const allUsers = [adminCredentials, ...registeredUsers];

      // Validate user credentials
      const user = allUsers.find((u) => u.email === email && u.password === password);
      console.log('Logged in user:', user); // Debugging log
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Save customer ID to localStorage if role is customer
      if (user.role === 'customer') {
        localStorage.setItem('custID', user.id);
      }

      // Navigate based on user role
      if (user.role === 'franchise') {
        navigate(`/franchise/${user.id}/dashboard`);
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'customer') {
        navigate('/customer/select-franchise');
      }
    } catch (err) {
      console.error(err); // Debugging log
      setError(err.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button
        className="register-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
        onClick={() => navigate('/register')}
      >
        Sign Up
      </button>
    </div>
  );
}