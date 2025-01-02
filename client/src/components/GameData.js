const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [String],
  status: { type: String, default: 'in-progress' },
  gameData: [
    {
      userId: String,
      questionId: Number,
      score: Number,
      timeTaken: Number,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
