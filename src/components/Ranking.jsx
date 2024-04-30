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
    <div className="ranking-container">
  <h2>RANKING</h2>
  <div className="ranking">
    <p> </p>
    <p> </p>
    <p><FaTimes />: <span className="score">{ranking.X}</span></p>
    <p><FaRegCircle />: <span className="score">{ranking.O}</span></p>
    <p><FaRegHandshake />: <span className="score">{ranking.empates}</span></p>
  </div>
  <div className="buttons">
    <button onClick={handleResetRanking}>Resetear Ranking</button>
    <button onClick={handleHideRanking}>Ocultar Ranking</button>
  </div>
</div>
  );
}

export default Ranking;
