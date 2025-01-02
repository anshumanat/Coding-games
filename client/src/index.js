import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from react-dom/client in React 18+
import App from './App';
import './index.css';

// Create a root element for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
