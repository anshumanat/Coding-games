// src/axiosInstance.js

import axios from 'axios';

// Create an instance of axios with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',  // Your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add more configurations like timeout, authentication headers, etc.
});

export default axiosInstance;
