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
  'diasorte',
  'supersete',
  'maismilionaria',
];

export const GAMES_SETTINGS: Record<GameType, { title: string }> = {
  megasena: { title: 'Mega-Sena' },
  lotofacil: { title: 'Lotofácil' },
  quina: { title: 'Quina' },
  lotomania: { title: 'Lotomania' },
  timemania: { title: 'Timemania' },
  duplasena: { title: 'Dupla-Sena' },
  federal: { title: 'Federal' },
  loteca: { title: 'Loteca' },
  diasorte: { title: 'Dia de Sorte' },
  supersete: { title: 'Super Sete' },
  maismilionaria: { title: 'Mais Milionária' },
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
  diasorte: {
    bg: 'bg-lottery-dia-de-sorte',
    text: 'text-lottery-dia-de-sorte-text',
    border: 'border-lottery-dia-de-sorte',
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
