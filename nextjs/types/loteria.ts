export type GameType = 
  | 'megasena' 
  | 'megavirada'
  | 'lotofacil' 
  | 'quina' 
  | 'lotomania'
  | 'timemania'
  | 'duplasena'
  | 'federal'
  | 'loteca'
  | 'diasorte'
  | 'supersete'
  | 'maismilionaria';

export interface BaseResult {
  loteria: GameType;
  numeroConcurso: number;
  data: string;
  dezenas: string[];
  acumulou: boolean;
  dataProximoConcurso: string;
  valorEstimadoProximoConcurso: number;
}

export interface TimeMania extends BaseResult {
  timeCoracao?: string;
}

export interface DuplaSena extends BaseResult {
  dezenas2: string[]; // segundo sorteio
}

export interface SuperSete extends BaseResult {
  colunas: {
    [key: number]: string;
  };
}

export interface Federal extends BaseResult {
  premios: {
    bilhete: string;
    valor: number;
  }[];
}

export interface DiaSorte extends BaseResult {
  mesSorte: string;
}

export type LotteryResult = BaseResult | TimeMania | DuplaSena | SuperSete | Federal | DiaSorte;
