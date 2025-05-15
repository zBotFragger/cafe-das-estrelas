import React, { useState } from 'react';

interface FogaoProps {
  cafeCoin: number;
  setCafeCoin: React.Dispatch<React.SetStateAction<number>>;
  setXp: React.Dispatch<React.SetStateAction<number>>;
}

const receitas = [
  { id: 1, nome: 'Café Simples', tempo: 3, custo: 5, lucro: 10, xp: 1 },
  { id: 2, nome: 'Cappuccino', tempo: 6, custo: 15, lucro: 30, xp: 3 },
  { id: 3, nome: 'Espresso Especial', tempo: 10, custo: 30, lucro: 60, xp: 7 }
];

const Fogao: React.FC<FogaoProps> = ({ cafeCoin, setCafeCoin, setXp }) => {
  const [cozinhando, setCozinhando] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState<number | null>(null);
  const [tempoRestante, setTempoRestante] = useState(0);

  const iniciarCozinha = () => {
    if (receitaSelecionada === null) return;
    const receita = receitas.find(r => r.id === receitaSelecionada);
    if (!receita) return;
    if (cafeCoin < receita.custo) {
      alert('Você não tem CafeCoin suficiente para preparar esta receita!');
      return;
    }

    setCozinhando(true);
    setTempoRestante(receita.tempo);

    const interval = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setCozinhando(false);
          setCafeCoin(c => c - receita.custo + receita.lucro);
          setXp(x => x + receita.xp);
          alert(`Você preparou ${receita.nome} e ganhou ${receita.lucro} CafeCoins e ${receita.xp} XP!`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div style={{border: '1px solid black', padding: 10, marginTop: 20}}>
      <h2>Fogão</h2>
      {cozinhando ? (
        <p>Cozinhando... Tempo restante: {tempoRestante}s</p>
      ) : (
        <>
          <select onChange={e => setReceitaSelecionada(Number(e.target.value))} value={receitaSelecionada || ''}>
            <option value="" disabled>Escolha a receita</option>
            {receitas.map(r => (
              <option key={r.id} value={r.id}>
                {r.nome} - Tempo: {r.tempo}s, Custo: {r.custo} CafeCoin, Lucro: {r.lucro} CafeCoin
              </option>
            ))}
          </select>
          <button onClick={iniciarCozinha} disabled={receitaSelecionada === null}>Cozinhar</button>
        </>
      )}
    </div>
  );
};

export default Fogao;
