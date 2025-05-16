// src/components/GameGrid.tsx
import React, { useEffect, useState } from 'react';
import garcom from '../assets/garcom.png';
import fogao from '../assets/fogao.png';
import mesa from '../assets/mesa.png';

interface GridItem {
  type: 'fogao' | 'mesa' | 'garcom' | 'cliente';
  x: number;
  y: number;
  status?: 'ocupado' | 'livre';
}

const sprites: Record<string, string> = {
  garcom,
  fogao,
  mesa,
};

const initialGridItems: GridItem[] = [
  { type: 'fogao', x: 0, y: 0 },
  { type: 'fogao', x: 1, y: 0 },
  { type: 'mesa', x: 2, y: 2, status: 'livre' },
  { type: 'mesa', x: 3, y: 3, status: 'livre' },
  { type: 'mesa', x: 4, y: 4, status: 'livre' },
  { type: 'garcom', x: 6, y: 6 },
];

const GRID_SIZE = 7;

const GameGrid: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>(initialGridItems);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [garcomPos, setGarcomPos] = useState<{ x: number; y: number }>({ x: 6, y: 6 });

  useEffect(() => {
    const interval = setInterval(() => {
      const mesasOcupadas = gridItems.filter(
        (item) => item.type === 'mesa' && item.status === 'ocupado'
      );
      const fogoes = gridItems.filter((item) => item.type === 'fogao');

      if (mesasOcupadas.length > 0 && fogoes.length > 0) {
        const mesa = mesasOcupadas[0];

        // Move o garçom até a mesa antes de servir
        setGarcomPos({ x: mesa.x, y: mesa.y });

        setTimeout(() => {
          setGridItems((prev) =>
            prev.map((item) =>
              item.x === mesa.x && item.y === mesa.y
                ? { ...item, status: 'livre' }
                : item
            )
          );
          setXp((prev) => prev + 1);
          setCoins((prev) => prev + 5);

          // Volta o garçom à posição inicial
          setTimeout(() => {
            setGarcomPos({ x: 6, y: 6 });
          }, 500);
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [gridItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      const mesasLivres = gridItems.filter(
        (item) => item.type === 'mesa' && item.status === 'livre'
      );
      if (mesasLivres.length > 0) {
        const mesa = mesasLivres[Math.floor(Math.random() * mesasLivres.length)];
        setGridItems((prev) =>
          prev.map((item) =>
            item.x === mesa.x && item.y === mesa.y
              ? { ...item, status: 'ocupado' }
              : item
          )
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [gridItems]);

  return (
    <div>
      <div className="mb-4 text-white">
        <p>XP: {xp}</p>
        <p>CafeCoins: {coins}</p>
      </div>
      <div className="grid grid-cols-7 grid-rows-7 gap-1 bg-green-800 p-2 rounded-xl w-fit">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const item = gridItems.find((i) => i.x === x && i.y === y);
          const isGarcomHere = garcomPos.x === x && garcomPos.y === y;

          return (
            <div
              key={index}
              className="w-16 h-16 bg-lime-900 border border-green-500 flex items-center justify-center rounded shadow-inner relative"
            >
              {item && (
                <img
                  src={sprites[item.type]}
                  alt={item.type}
                  className={`w-10 h-10 ${item.status === 'ocupado' ? 'opacity-50' : ''}`}
                />
              )}
              {isGarcomHere && !item && (
                <img src={garcom} alt="garcom" className="w-10 h-10 absolute" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameGrid;
