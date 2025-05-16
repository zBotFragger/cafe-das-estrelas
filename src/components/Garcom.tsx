// src/components/Garcom.tsx
import React from 'react';
import garcom from '../assets/garcom.png';

interface GarcomProps {
  className?: string;
}

const Garcom: React.FC<GarcomProps> = ({ className }) => {
  return <img src={garcom} alt="Garçom" className={className} />;
};

export default Garcom;
