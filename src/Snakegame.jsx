import React, { useEffect, useState } from 'react';

const dotSize = 20;

const SnakeGame = () => {
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState([{ top: 0, left: 0 }]);
  const [food, setFood] = useState(null);
  const [gameInterval, setGameInterval] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  const updateSnake = () => {
    const head = { ...snake[0] }; // copy head
    switch (direction) {
      case 'up':
        head.top -= dotSize;
        break;
      case 'down':
        head.top += dotSize;
        break;
      case 'left':
        head.left -= dotSize;
        break;
      case 'right':
        head.left += dotSize;
        break;
      default:
        break;
    }
    const newSnake = [head, ...snake];
    if (food && food.top === head.top && food.left === head.left) {
      setScore(score + 10);
      setFood(null);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const updateFood = () => {
    if (food === null) {
      setFood({
        top: Math.floor(Math.random() * 19) * dotSize,
        left: Math.floor(Math.random() * 19) * dotSize,
      });
    }
  };

  const resetGame = () => {
    setDirection('right');
    setScore(0);
    setSnake([{ top: 0, left: 0 }]);
    setFood(null);
    clearInterval(gameInterval);
    setGameInterval(null);
  };

  const gameOver = () => {
    alert('Game Over!');
    resetGame();
  };

  const startGame = () => {
    setGameRunning(true);
    setGamePaused(false);
  };

  const pauseGame = () => {
    setGamePaused(true);
  };

  useEffect(() => {
    if (gameRunning && !gamePaused) {
      const interval = setInterval(() => {
        updateSnake();
        updateFood();
        const head = snake[0];
        if (
          head.left < 0 ||
          head.top < 0 ||
          head.left >= 380 ||
          head.top >= 380 ||
          snake.find((dot, index) => index !== 0 && dot.top === head.top && dot.left === head.left)
        ) {
          gameOver();
        }
      }, 200);
      setGameInterval(interval);
      return () => clearInterval(interval);
    }
  }, [snake, food, direction, gameRunning, gamePaused]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowRight':
          setDirection('right');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white bg-[url('../public/8-QHtTfr2FDOET3zT.png')] bg-no-repeat bg-center bg-cover">
     
     <div className="flex  items-center justify-center  bg-gray-800 text-white">
      <button 
        onClick={startGame} 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Start Game
      </button>
      <button 
        onClick={pauseGame} 
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Pause Game
      </button>
    
    </div>
      <div id="score" className="text-4xl mb-4">Score: {score}</div>
      <div id="game-board" className="relative border-2 border-black bg-black w-[400px] h-[400px]">
        {snake.map((dot, index) => (
          <div
            key={index}
            className="dot absolute w-5 h-5 border border-black bg-gray-400 shadow-md"
            style={{ top: `${dot.top}px`, left: `${dot.left}px` }}
          />
        ))}
        {food && (
          <div
            className="dot absolute w-5 h-5 border border-black bg-green-500 shadow-md"
            style={{ top: `${food.top}px`, left: `${food.left}px` }}
          />
        )}
      </div>
    </div>
  );
};

export default SnakeGame;