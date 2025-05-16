// src/components/HUD.tsx

import React from 'react';

interface HUDProps {
  xp: number;
  coins: number;
}

const HUD: React.FC<HUDProps> = ({ xp, coins }) => (
  <div className="mb-4 text-white">
    <p>XP: {xp}</p>
    <p>CafeCoins: {coins}</p>
  </div>
);

export default HUD;
