import React, { useState } from 'react';
import Fogao from '../components/Fogao';

const Game: React.FC = () => {
  console.log("Game component renderizou");
  const [cafeCoin, setCafeCoin] = useState(100);
  const [xp, setXp] = useState(0);

  return (
    
    <div style={{ padding: 20 }}>
      <h1>Café das Estrelas - Seu Café</h1>
      <p>CafeCoin: {cafeCoin}</p>
      <p>XP: {xp}</p>
      <Fogao cafeCoin={cafeCoin} setCafeCoin={setCafeCoin} setXp={setXp} />
    </div>
  );
};



export default Game;
