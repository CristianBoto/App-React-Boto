import React, { useState, useEffect } from 'react';
import winningSound from './musica/champions-queen_1635134178.mp3';
import losingSound from './musica/mario-kart-perdiste-perder-loser.mp3';
import { FaTimes, FaRegCircle, FaRegHandshake } from "react-icons/fa";
import Player from './Player';
import Ranking from './Ranking';

const TURNS = {
  X: 'x',
  O: 'o'
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6]             // Diagonal
];

function createConfetti(isWin) {
  const confettiContainer = document.querySelector('.confetti-container');
  const confettiCount = 50;

  const confettiImage = isWin ? 'conffeti.png' : 'empate.png';

  for (let i = 0; i < confettiCount; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti');
    confettiPiece.style.backgroundImage = `url(src/assets/${confettiImage})`;
    confettiPiece.style.left = `${Math.random() * 100}%`;
    confettiPiece.style.animationDelay = `${Math.random() * 3}s`;
    confettiContainer.appendChild(confettiPiece);
  }
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(null);
  const [audio, setAudio] = useState(null);
  const [showRanking, setShowRanking] = useState(false);
  const [ranking, setRanking] = useState({ X: 0, O: 0, empates: 0 });

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  useEffect(() => {
    if (winner) {
      const newAudio = new Audio(winner === 'Empate' ? losingSound : winningSound);
      newAudio.play();
      setAudio(newAudio);
      createConfetti(winner !== 'Empate');
      if (winner !== 'Empate') {
        const winnerKey = winner === TURNS.X ? 'X' : 'O';
        setRanking(prevRanking => ({
          ...prevRanking,
          [winnerKey]: prevRanking[winnerKey] + 1
        }));
      } else {
        setRanking(prevRanking => ({
          ...prevRanking,
          empates: prevRanking.empates + 1
        }));
      }
    }
  }, [winner]);

  const resetGame = () => {
    const confettiContainer = document.querySelector('.confetti-container');
    confettiContainer.innerHTML = '';
    if (audio) {
      audio.pause();
    }

    setBoard(Array(9).fill(null));
    setTurn(null);
    setWinner(null);
    
  };

  const resetRanking = () => {
    setRanking({ X: 0, O: 0, empates: 0 });
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn || TURNS.X;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner('Empate');
    }
  };

  const handleRankingClick = () => {
    setShowRanking(true);
  };

  if (showRanking) {
    return (
      <main className='board'>
        <h1>Tres en Línea</h1>
        <Ranking ranking={ranking} onRestart={resetGame} onResetRanking={resetRanking} onHideRanking={() => setShowRanking(false)} />
      </main>
    );
  }

  if (turn === null) {
    return (
      <main className='board'>
        <h1>Tres en Línea</h1>
        <div className="start-choice">
          <p>¿Quién empieza?</p>
          <button onClick={() => setTurn(TURNS.X)}><Player symbol="X" /></button>
          <button onClick={() => setTurn(TURNS.O)}><Player symbol="O" /></button>
        </div>
      </main>
    );
  }

  return (
    <main className='board'>
      <h1>Tres en Línea</h1>

      <section className="game">
        {board.map((value, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {value === TURNS.X ? <FaTimes /> : value === TURNS.O ? <FaRegCircle /> : null}
          </Square>
        ))}
      </section>

      <section className="turn">
        {turn && (
          <Square isSelected={turn === TURNS.X}><FaTimes /></Square>
        )}
        {turn && (
          <Square isSelected={turn === TURNS.O}><FaRegCircle /></Square>
        )}
      </section>

      {winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h2>{winner === 'Empate' ? 'EMPATE!' : 'Ganó:'}</h2>
            <header className='win'>
              <div className="content-wrapper">
                {winner !== 'Empate' && winner && (
                  <Square>{winner === TURNS.X ? <FaTimes /> : <FaRegCircle />}</Square>
                )}
                {winner === 'Empate' && (
                  <Square><FaRegHandshake /></Square>
                )}
              </div>
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
              <button onClick={handleRankingClick}>Ranking</button>
            </footer>
          </div>
        </section>
      )}

      <div className="confetti-container"></div>
    </main>
  );
}

export default App;
