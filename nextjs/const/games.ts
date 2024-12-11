import { GameType } from '@/types/loteria';

export const GAME_TYPES: GameType[] = [
  'megasena',
  'lotofacil',
  'quina',
  'lotomania',
  'timemania',
  'duplasena',
  'federal',
  'loteca',
  'diadesorte',
  'supersete',
  'maismilionaria',
];

interface GameConfig {
  title: string;
  maxNumbers: number;  // quantidadeMaximaDeNumerosPorJogo
  requiredNumbers: number;  // quantidadeNumeros
  minNumber: number;  // numeroMinimo
  maxNumber: number;  // numeroMaximo
  minTrevo?: number;  // numeroMinimoTrevo
  maxTrevo?: number;  // numeroMaximoTrevo
}

export const GAMES_SETTINGS: Record<GameType, GameConfig> = {
  megasena: {
    title: 'Mega-Sena',
    maxNumbers: 20,
    requiredNumbers: 6,
    minNumber: 1,
    maxNumber: 60
  },
  lotofacil: {
    title: 'Lotofácil',
    maxNumbers: 20,
    requiredNumbers: 15,
    minNumber: 1,
    maxNumber: 25
  },
  quina: {
    title: 'Quina',
    maxNumbers: 15,
    requiredNumbers: 5,
    minNumber: 1,
    maxNumber: 80
  },
  lotomania: {
    title: 'Lotomania',
    maxNumbers: 50,
    requiredNumbers: 50,
    minNumber: 1,
    maxNumber: 100
  },
  duplasena: {
    title: 'Dupla-Sena',
    maxNumbers: 15,
    requiredNumbers: 6,
    minNumber: 1,
    maxNumber: 50
  },
  diadesorte: {
    title: 'Dia de Sorte',
    maxNumbers: 15,
    requiredNumbers: 7,
    minNumber: 1,
    maxNumber: 31
  },
  maismilionaria: {
    title: 'Mais Milionária',
    maxNumbers: 6,
    requiredNumbers: 6,
    minNumber: 1,
    maxNumber: 50,
    minTrevo: 1,
    maxTrevo: 6
  },
  timemania: {
    title: 'Timemania',
    maxNumbers: 10,
    requiredNumbers: 10,
    minNumber: 1,
    maxNumber: 80
  },
  federal: {
    title: 'Federal',
    maxNumbers: 0,
    requiredNumbers: 0,
    minNumber: 0,
    maxNumber: 0
  },
  loteca: {
    title: 'Loteca',
    maxNumbers: 14,
    requiredNumbers: 14,
    minNumber: 1,
    maxNumber: 3
  },
  supersete: {
    title: 'Super Sete',
    maxNumbers: 7,
    requiredNumbers: 7,
    minNumber: 0,
    maxNumber: 9
  }
};

export const gameThemes = {
  megasena: {
    bg: 'bg-lottery-mega-sena',
    text: 'text-white',
    border: 'border-lottery-mega-sena',
  },
  megavirada: {
    bg: 'bg-lottery-mega-virada',
    text: 'text-white',
    border: 'border-lottery-mega-virada',
  },
  maismilionaria: {
    bg: 'bg-lottery-mais-milionaria',
    text: 'text-white',
    border: 'border-lottery-mais-milionaria',
  },
  lotofacil: {
    bg: 'bg-lottery-lotofacil',
    text: 'text-white',
    border: 'border-lottery-lotofacil',
  },
  quina: {
    bg: 'bg-lottery-quina',
    text: 'text-white',
    border: 'border-lottery-quina',
  },
  lotomania: {
    bg: 'bg-lottery-lotomania',
    text: 'text-white',
    border: 'border-lottery-lotomania',
  },
  timemania: {
    bg: 'bg-lottery-timemania',
    text: 'text-lottery-timemania-text',
    border: 'border-lottery-timemania',
  },
  duplasena: {
    bg: 'bg-lottery-dupla-sena',
    text: 'text-white',
    border: 'border-lottery-dupla-sena',
  },
  loteca: {
    bg: 'bg-lottery-loteca',
    text: 'text-white',
    border: 'border-lottery-loteca',
  },
  lotogol: {
    bg: 'bg-lottery-lotogol',
    text: 'text-white',
    border: 'border-lottery-lotogol',
  },
  diadesorte: {
    bg: 'bg-lottery-dia-de-sorte',
    text: 'text-lottery-dia-de-sorte-text',
    border: 'border-lottery-dia-de-sorte',
  },
  supersete: {
    bg: 'bg-lottery-super-sete',
    text: 'text-lottery-super-sete-text',
    border: 'border-lottery-super-sete',
  },
  federal: {
    bg: 'bg-lottery-federal',
    text: 'text-white',
    border: 'border-lottery-federal',
  },
} as const;
