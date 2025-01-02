const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');  // Ensure this line exists

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002'], // Update this to match the correct frontend URL (http://localhost:3002)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middlewares
app.use(express.json());
app.use('/game', gameRoutes); 

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use('/api/auth', authRoutes);  // Ensure this route for authentication
app.use('/api/game', gameRoutes);  // Ensure this route for game-related actions
app.use('/api/user', userRoutes);  // Ensure this line exists for user-related actions

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
