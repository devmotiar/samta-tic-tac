import React, { useState, useEffect } from 'react';
import './App.css';

const Square = ({ value, onClick }) => {
  const backgroundColor = value === 'X' ? 'lightblue' : value === 'O' ? 'lightcoral' : 'white';
  return (
    <button
      className="square"
      style={{ color: value === 'X' ? 'blue' : 'red', backgroundColor }}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('ticTacToeScores'));
    if (storedScores) {
      setScores(storedScores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
  }, [scores]);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || newSquares[i]) {
      return;
    }
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setScores({ ...scores, [winner]: scores[winner] + 1 });
      setTimeout(() => resetBoard(), 2000);
    }
  };

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetGame = () => {
    resetBoard();
    setScores({ X: 0, O: 0 });
    localStorage.removeItem('ticTacToeScores');
  };

  const calculateWinner = (squares) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="game">
      <div className="scoreboard">
        <div>Blue (X): {scores.X}</div>
        <div>Red (O): {scores.O}</div>
      </div>
      <Board squares={squares} onClick={handleClick} />
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default App;
