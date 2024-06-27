// src/App.js
import React, { useState, useEffect } from 'react';
// import './App.css';

const emptyBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [isBlueTurn, setIsBlueTurn] = useState(true);
  const [blueScore, setBlueScore] = useState(
    parseInt(localStorage.getItem('blueScore')) || 0
  );
  const [redScore, setRedScore] = useState(
    parseInt(localStorage.getItem('redScore')) || 0
  );

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isBlueTurn ? 'blue' : 'red';
    setBoard(newBoard);
    setIsBlueTurn(!isBlueTurn);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      if (winner === 'blue') {
        setBlueScore(blueScore + 1);
        localStorage.setItem('blueScore', blueScore + 1);
      } else if (winner === 'red') {
        setRedScore(redScore + 1);
        localStorage.setItem('redScore', redScore + 1);
      }
      setTimeout(() => setBoard(emptyBoard), 2000);
    }
  }, [board]);

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <div className="text-2xl">Blue: {blueScore} | Red: {redScore}</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <div
            key={index}
            className={`w-24 h-24 flex items-center justify-center text-4xl cursor-pointer ${value === 'blue' ? 'bg-blue-500' : value === 'red' ? 'bg-red-500' : 'bg-white'}`}
            onClick={() => handleClick(index)}
          >
            {value === 'blue' ? 'O' : value === 'red' ? 'X' : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
