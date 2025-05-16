// src/components/FogaoSprite.tsx
import React from 'react';
import fogaoImg from '../assets/fogao.png';

interface FogaoSpriteProps {
  className?: string;
}

const FogaoSprite: React.FC<FogaoSpriteProps> = ({ className }) => (
  <img src={fogaoImg} alt="Fogão" className={className} />
);

export default FogaoSprite;
