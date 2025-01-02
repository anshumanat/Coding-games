import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; // Import your axios instance
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login endpoint
      const response = await axiosInstance.post('api/auth/login', { email, password });

      // Save the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      console.log('Login successful:', response.data);

      // Redirect to the /game route upon successful login
      navigate('/game');
    } catch (err) {
      console.error('Login error:', err);

      // Show an error message if login fails
      alert('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Email Input Section */}
        <div className="email-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input Section */}
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

