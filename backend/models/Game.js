const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const User = require('../models/User');
const Question = require('../models/Question');
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  status: { type: String, default: 'in-progress' },
  totalScore: { type: Number, default: 0 },
  gameData: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
      score: { type: Number, required: true },
      timeTaken: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Game', gameSchema);

router.post('/save', async (req, res) => {
  console.log('Request body received:', req.body);
  const { gameId, userId, questionId, score, timeTaken } = req.body;

  // Validate incoming data
  if (!gameId || !userId || !questionId || score === undefined || timeTaken === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Validate user and question
    const user = await User.findById(userId);
    const question = await Question.findById(questionId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Find or create game session
    let game = await Game.findOne({ gameId });
    if (game) {
      // Update existing game session
      game.gameData.push({ userId, questionId, score, timeTaken });
      game.totalScore += score;
      await game.save();
      return res.status(200).json({ message: 'Game data updated successfully', game });
    } else {
      // Create a new game session
      const newGame = new Game({
        gameId,
        players: [userId],
        gameData: [{ userId, questionId, score, timeTaken }],
        totalScore: score,
      });
      await newGame.save();
      return res.status(201).json({ message: 'New game session created successfully', newGame });
    }
  } catch (error) {
    console.error('Error saving game data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
