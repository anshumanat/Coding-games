import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css'; // Import CSS for styling

// Sample questions for the coding learning game
const questions = [
  {
    id: 1,
    question: 'Write a function to return the sum of two numbers.',
    answer: 'function sum(a, b) { return a + b; }',
    userAnswer: ''
  },
  {
    id: 2,
    question: 'Write a function to check if a number is even.',
    answer: 'function isEven(num) { return num % 2 === 0; }',
    userAnswer: ''
  },
  {
    id: 3,
    question: 'Write a function to reverse a string.',
    answer: 'function reverseString(str) { return str.split("").reverse().join(""); }',
    userAnswer: ''
  }
];

const Game = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30); // Timer for each question
  const [isGameOver, setIsGameOver] = useState(false);

  // Simulating `gameId` and `userId` for the sake of this example
  const gameId = 'your_game_id'; // Replace with actual game ID
  const userId = 'your_user_id'; // Replace with actual user ID

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let timer;
    if (timeRemaining > 0 && !isGameOver) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setFeedback('Time is up! The correct answer was: ' + currentQuestion.answer);
      setIsGameOver(true);
    }

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [timeRemaining, isGameOver, currentQuestion.answer]); // Add currentQuestion.answer to the dependency array

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmitAnswer = async () => {
    let correct = false;
    if (userAnswer.trim() === currentQuestion.answer) {
      setFeedback('Correct!');
      setScore(score + 1);
      correct = true;
    } else {
      setFeedback('Incorrect. The correct answer was: ' + currentQuestion.answer);
    }

    setIsGameOver(true);

    // Log the payload data being sent to the server
    const payload = {
      gameId: gameId, 
      userId: userId, 
      questionId: currentQuestion.id,
      score: correct ? score + 1 : score,
      timeTaken: 30 - timeRemaining
    };
    console.log('Payload:', payload);  // Log the data being sent to the server

    // Save progress to the database
    try {
      const response = await axios.post('http://localhost:5000/game/save', payload);
      console.log('Game data saved:', response.data);
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setFeedback('');
      setTimeRemaining(30); // Reset the timer for the next question
      setIsGameOver(false);
    } else {
      setFeedback('Congratulations! You completed all the questions.');
    }
  };

  return (
    <div className="game-container">
      <h2>Coding Learning Game</h2>
      <div className="question-section">
        <h3>Question {currentQuestion.id}</h3>
        <p>{currentQuestion.question}</p>
        <textarea
          rows="6"
          cols="50"
          placeholder="Write your code here..."
          value={userAnswer}
          onChange={handleInputChange}
          disabled={isGameOver} // Disable textarea after submitting answer
        ></textarea>
        <div className="button-container">
          <button onClick={handleSubmitAnswer} disabled={isGameOver}>
            Submit Answer
          </button>
        </div>
        <div className="feedback-section">
          <p>{feedback}</p>
        </div>
        <div className="timer-section">
          <p>Time Remaining: {timeRemaining}s</p>
          <div className="progress-bar-container">
            <div
              className="progress-fill"
              style={{
                width: `${(timeRemaining / 30) * 100}%`, // Dynamic width based on timer
                transition: 'width 1s linear' // Smooth animation
              }}
            ></div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleNextQuestion} disabled={!isGameOver}>
            Next Question
          </button>
        </div>
        <div className="score-section">
          <p>Score: {score}</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
