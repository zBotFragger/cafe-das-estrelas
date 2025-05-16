import React, { useEffect, useState } from "react";
import "../Game.css";
import mesaImg from "../assets/mesa.png";
import fogaoImg from "../assets/fogao.png";
import garcomImg from "../assets/garcom.png";

type Pos = { x: number; y: number };
type Pedido = "Capuccino" | "Latte" | "Expresso";

const mesasIniciais: Pos[] = [{ x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 }];
const fogaoPos: Pos = { x: 3, y: 6 };
const garcomInicial: Pos = { x: 3, y: 5 };

const Game = () => {
  const [clientes, setClientes] = useState<{ pos: Pos; pedido: Pedido }[]>([]);
  const [garcomPos, setGarcomPos] = useState<Pos>(garcomInicial);
  const [pedidoAtual, setPedidoAtual] = useState<Pedido | null>(null);
  const [mostrarBalao, setMostrarBalao] = useState(false);

  // Simula chegada de cliente a cada 10 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      const mesasVazias = mesasIniciais.filter(
        m => !clientes.find(c => c.pos.x === m.x && c.pos.y === m.y)
      );

      if (mesasVazias.length > 0) {
        const mesaAleatoria = mesasVazias[Math.floor(Math.random() * mesasVazias.length)];
        const novoPedido: Pedido = ["Capuccino", "Latte", "Expresso"][Math.floor(Math.random() * 3)] as Pedido;

        setClientes(prev => [...prev, { pos: mesaAleatoria, pedido: novoPedido }]);
      }
    }, 10000);

    return () => clearInterval(intervalo);
  }, [clientes]);

  // Movimento do garçom até cliente, depois fogão
  useEffect(() => {
    if (clientes.length === 0 || pedidoAtual) return;

    const cliente = clientes[0]; // pega o primeiro da fila

    const moverAte = (destino: Pos, callback: () => void) => {
      const intervalo = setInterval(() => {
        setGarcomPos(prev => {
          const dx = destino.x - prev.x;
          const dy = destino.y - prev.y;

          if (dx === 0 && dy === 0) {
            clearInterval(intervalo);
            callback();
            return prev;
          }

          return {
            x: prev.x + Math.sign(dx),
            y: prev.y + Math.sign(dy),
          };
        });
      }, 500);
    };

    // Mover até o cliente → depois até fogão
    moverAte(cliente.pos, () => {
      setPedidoAtual(cliente.pedido); // pega pedido
      moverAte(fogaoPos, () => {
        setMostrarBalao(true);
        setTimeout(() => {
          setMostrarBalao(false);
          setClientes(prev => prev.slice(1)); // remove cliente atendido
          setPedidoAtual(null);
        }, 3000);
      });
    });
  }, [clientes, pedidoAtual]);

  // Renderizar grid 7x7
  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const posKey = `${x}-${y}`;
        const cliente = clientes.find(c => c.pos.x === x && c.pos.y === y);
        const isFogao = fogaoPos.x === x && fogaoPos.y === y;
        const isGarcom = garcomPos.x === x && garcomPos.y === y;
        const isMesa = mesasIniciais.find(m => m.x === x && m.y === y);

        grid.push(
          <div key={posKey} className="grid-cell">
            {isMesa && <img src={mesaImg} className="sprite" alt="mesa" />}
            {cliente && <div className="cliente">👤</div>}
            {isFogao && <img src={fogaoImg} className="sprite" alt="fogão" />}
            {isGarcom && (
              <div className="garcom">
                <img src={garcomImg} className="sprite" alt="garçom" />
                {mostrarBalao && pedidoAtual && (
                  <div className="balao-pedido">{pedidoAtual}</div>
                )}
              </div>
            )}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div className="game-wrapper">
      <h1>Café das Estrelas</h1>
      <div className="status-panel">XP: 100 | CafeCoins: 250</div>
      <div className="game-container">{renderGrid()}</div>
    </div>
  );
};

export default Game;
