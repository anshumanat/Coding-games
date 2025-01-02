import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; // Import the axios instance
import './Register.css'; // Import the Register CSS file

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Add state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Use the axios instance for the API call
      await axiosInstance.post('/api/auth/register', { username, email, password });
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration failed', error);
      alert(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
