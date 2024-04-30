import React from 'react';
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Player = ({ symbol }) => {
  return (
    <div className="player">
      {symbol === 'X' ? <FaTimes /> : symbol === 'O' ? <FaRegCircle /> : null}
    </div>
  );
}

export default Player;
