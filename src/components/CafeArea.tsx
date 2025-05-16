import React from 'react';

interface CafeAreaProps {
  size?: number; // tamanho do grid, default 7
}

const CafeArea: React.FC<CafeAreaProps> = ({ size = 7 }) => {
  // cria array com size*size elementos para renderizar os quadradinhos
  const tiles = Array.from({ length: size * size });

  const tileSize = 50; // tamanho de cada quadrado em px

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${size}, ${tileSize}px)`,
        gap: 2,
        backgroundColor: '#001f33',
        border: '3px solid #0ff',
        width: size * tileSize + (size - 1) * 2,
        margin: '20px auto',
        borderRadius: 10,
        boxShadow: '0 0 10px #00ffff80',
      }}
    >
      {tiles.map((_, index) => (
        <div
          key={index}
          style={{
            width: tileSize,
            height: tileSize,
            backgroundColor: '#00334d',
            border: '1px solid #00ccff',
            boxShadow: 'inset 0 0 5px #00ffff80',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          title={`Tile ${index + 1}`}
          onClick={() => alert(`Você clicou no espaço ${index + 1}`)}
        />
      ))}
    </div>
  );
};

export default CafeArea;
