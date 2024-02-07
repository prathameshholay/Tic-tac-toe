import { useState } from 'react';

function Square({ value, onSquareClick, isWinner }) {
  return (
    <button className={`square ${isWinner ? 'winner' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }

  function isDraw(squares) {
    return squares.every(square => square !== null);
  }
  

  const winnerInfo = calculateWinner(squares);
  let status;
  if (winnerInfo) {
    status = "Winner: " + winnerInfo.winner;
  } else if (squares.every(square => square !== null)) {
    status = "It's a Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handlePlayAgain() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="main">
      <video className="video-background" autoPlay loop muted>
        <source src="src/assets/paint.mp4" type="video/mp4" />
        {/* Add other video formats if needed */}
      </video>
      <div className="video-overlay"></div>
      <p id='identity'><b>Player 1: X & Player 2: O</b></p>
      <div className="board-row">
        {Array.from({ length: 3 }, (_, i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            isWinner={winnerInfo && winnerInfo.line.includes(i)}
          />
        ))}
      </div>
      <div className="board-row">
        {Array.from({ length: 3 }, (_, i) => (
          <Square
            key={i + 3}
            value={squares[i + 3]}
            onSquareClick={() => handleClick(i + 3)}
            isWinner={winnerInfo && winnerInfo.line.includes(i + 3)}
          />
        ))}
      </div>
      <div className="board-row">
        {Array.from({ length: 3 }, (_, i) => (
          <Square
            key={i + 6}
            value={squares[i + 6]}
            onSquareClick={() => handleClick(i + 6)}
            isWinner={winnerInfo && winnerInfo.line.includes(i + 6)}
          />
        ))}
      </div>
      <div className="status">{status}</div>
      {winnerInfo || isDraw(squares) ? <button id='playAgain' onClick={handlePlayAgain}>Play Again</button> : null}
    </div>
  );
}
