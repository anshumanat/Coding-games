import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
