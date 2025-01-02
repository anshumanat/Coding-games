import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">Welcome to the Coding Game</h1>
      <p className="home-text">
        Learn to code interactively with fun challenges and exciting games. Start your coding journey today!
      </p>
      <button className="home-button" onClick={() => window.location.href = '/game'}>
        Start Game
      </button>
    </div>
  );
};

export default Home;
