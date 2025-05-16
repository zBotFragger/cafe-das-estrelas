// src/components/Mesa.tsx
import React from 'react';
import mesa from '../assets/mesa.png';

interface MesaProps {
  className?: string;
  ocupado?: boolean;
}

const Mesa: React.FC<MesaProps> = ({ className, ocupado }) => {
  return (
    <img
      src={mesa}
      alt="Mesa"
      className={`${className} ${ocupado ? 'opacity-50' : ''}`}
    />
  );
};

export default Mesa;
