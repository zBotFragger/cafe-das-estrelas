export interface ClienteFamoso {
  id: number;
  nome: string;
  profissao: string;
  fama: string;
  pratoFavoritoId: number;
}

export const clientesFamosos: ClienteFamoso[] = [
  {
    id: 1,
    nome: 'Lara Estrela',
    profissao: 'Cantora',
    fama: 'Super estrela pop nacional',
    pratoFavoritoId: 3,
  },
  {
    id: 2,
    nome: 'João Futebol',
    profissao: 'Jogador de futebol',
    fama: 'Campeão mundial e ícone do esporte',
    pratoFavoritoId: 2,
  },
  {
    id: 3,
    nome: 'Maria Jornalista',
    profissao: 'Jornalista',
    fama: 'Famosa apresentadora de TV',
    pratoFavoritoId: 1,
  },
];