import React, { useState } from 'react';
import CafeArea from '../components/CafeArea';
import Fogao from '../components/Fogao';

const Game: React.FC = () => {
  const [cafeCoin, setCafeCoin] = useState(100);
  const [xp, setXp] = useState(0);

  return (
    <div style={{ padding: 20, backgroundColor: '#001f33', minHeight: '100vh', color: '#0ff' }}>
      <h1 style={{ textAlign: 'center' }}>Café das Estrelas - Seu Café</h1>
      <p>CafeCoin: {cafeCoin}</p>
      <p>XP: {xp}</p>
      
      <CafeArea size={7} />

      <Fogao cafeCoin={cafeCoin} setCafeCoin={setCafeCoin} setXp={setXp} />
    </div>
  );
};

export default Game;
