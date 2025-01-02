import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing components for the routes
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import About from './components/About';
import Features from './components/Features';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      {/* Header stays fixed on top for all pages */}
      <Header />

      {/* Main container for page content */}
      <div className="app-container">
        <Routes>
          {/* Define routes for each page */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={<Game />} /> {/* Route for the game */}
          <Route path="/about" element={<About />} /> {/* Route for About page */}
          <Route path="/features" element={<Features />} /> {/* Route for Features page */}
          <Route path="/contact" element={<Contact />} /> {/* Route for Contact page */}
        </Routes>
      </div>

      {/* Optional Footer for consistent layout across pages */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
