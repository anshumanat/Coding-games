const express = require('express');
const Game = require('../models/Game');  // Assuming you create a Game model
const User = require('../models/User'); // Assuming you have a User model
const Question = require('../models/Question'); // Assuming you have a Question model
const router = express.Router();


// Start a new game
router.post('/start', async (req, res) => {
  try {
    const { players } = req.body;
    if (!players || players.length === 0) {
      return res.status(400).json({ message: 'Players are required to start a game.' });
    }

    const newGame = new Game({
      players,
      status: 'in-progress',
      totalScore: 0, // Initial score
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch game status
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Save game data after solving a question
router.post('/save', async (req, res) => {
  const { gameId, userId, questionId, score, timeTaken } = req.body;

  // Validate incoming data
  if (!gameId || !userId || !questionId || score === undefined || timeTaken === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Retrieve game, user, and question
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    // Create a new entry for the question solved
    const newEntry = {
      userId,
      questionId,
      score,
      timeTaken,
      timestamp: new Date(),
    };

    // Assuming the Game model has a `gameData` array to store question-related data
    game.gameData.push(newEntry);
    game.totalScore += score;  // Update the total score after each question

    // Save the game session
    await game.save();

    res.status(201).json({ message: 'Game data saved successfully', game });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save game data', error: err.message });
  }
});

module.exports = router;
