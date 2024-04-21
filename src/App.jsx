// Importamos React y los hooks necesarios
import React, { useState, useEffect } from 'react';
// Importamos el sonido de victoria
import winningSound from './musica/champions-queen_1635134178.mp3';
// Importamos el sonido de derrota
import losingSound from './musica/mario-kart-perdiste-perder-loser.mp3';
// Importamos los iconos de FontAwesome
import { FaTimes, FaRegCircle, FaRegHandshake } from "react-icons/fa";
import Player from './Player';

// Definimos los turnos y la función para renderizar un cuadrado
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

function createConfetti() {
  const confettiContainer = document.querySelector('.confetti-container');
  const confettiCount = 50; // Número de piezas de confeti

  for (let i = 0; i < confettiCount; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti');
    confettiPiece.style.backgroundImage = 'url(src/imagenes/conffeti.png)';
    confettiPiece.style.left = `${Math.random() * 100}%`; // Posición horizontal aleatoria
    confettiPiece.style.animationDelay = `${Math.random() * 3}s`; // Retraso de animación aleatorio
    confettiContainer.appendChild(confettiPiece);
  }
}

function createTieConfetti() {
  const tieconfettiContainer = document.querySelector('.tieconfetti-container');
  const tieconfettiCount = 50; // Número de piezas de confeti

  for (let i = 0; i < tieconfettiCount; i++) {
    const tieconfettiPiece = document.createElement('div');
    tieconfettiPiece.classList.add('tieconfetti');
    tieconfettiPiece.style.backgroundImage = 'url(src/imagenes/empate.png)';
    tieconfettiPiece.style.left = `${Math.random() * 100}%`; // Posición horizontal aleatoria
    tieconfettiPiece.style.animationDelay = `${Math.random() * 3}s`; // Retraso de animación aleatorio
    tieconfettiContainer.appendChild(tieconfettiPiece);
  }
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(null); // Inicialmente no hay turno seleccionado
  const [winner, setWinner] = useState(null);
  const [audio, setAudio] = useState(null);

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
    }
  }, [winner]);

  const resetGame = () => {
    const confettiContainer = document.querySelector('.confetti-container');
    confettiContainer.innerHTML = '';
    const tieconfettiContainer = document.querySelector('.tieconfetti-container');
    tieconfettiContainer.innerHTML = '';
    if (audio) {
      audio.pause();
    }
  
    setBoard(Array(9).fill(null));
    setTurn(null); // Reiniciar el turno seleccionado
    setWinner(null);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn || TURNS.X; // Si no se ha seleccionado un turno, usar X como predeterminado
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      createConfetti();
    } else if (!newBoard.includes(null)) {
      setWinner('Empate');
      createTieConfetti();
    }
  };

  // Agregar condición para evitar que se inicie el juego si no se ha seleccionado un turno
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
            </footer>
          </div>
        </section>
      )}
  
      <div className="confetti-container"></div>
      <div className="tieconfetti-container"></div>
    </main>
  );
}

export default App;