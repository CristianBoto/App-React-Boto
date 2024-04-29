import React from 'react';
import { FaTimes, FaRegCircle,FaRegHandshake  } from "react-icons/fa";

const Ranking = ({ ranking, onRestart, onResetRanking, onHideRanking }) => {
  const handleRestartGame = () => {
    onRestart(); // Reiniciar el juego sin afectar el ranking
  };

  const handleResetRanking = () => {
    onResetRanking(); // Reiniciar el ranking
  };

  const handleHideRanking = () => {
    onHideRanking(); // Ocultar el componente Ranking
  };

  return (
    <div className="ranking">
      <h2>Ranking</h2>
      <p><FaTimes />: {ranking.X}</p>
      <p><FaRegCircle />: {ranking.O}</p>
      <p><FaRegHandshake />: {ranking.empates}</p>
  
      <button onClick={handleResetRanking}>Resetear Ranking</button>
      <button onClick={handleHideRanking}>Ocultar Ranking</button>
    </div>
  );
}

export default Ranking;
