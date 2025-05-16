// src/components/Balcao.tsx
import React from 'react';
import balcao from '../assets/balcao.png';

interface BalcaoProps {
  className?: string;
}

const Balcao: React.FC<BalcaoProps> = ({ className }) => {
  return <img src={balcao} alt="Balcão" className={className} />;
};

export default Balcao;
