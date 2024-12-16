import React from 'react';
import { FaCalendarAlt as Calendar } from 'react-icons/fa';
import { FiTarget as Target } from 'react-icons/fi';
import { TbMapPinFilled as MapPin } from 'react-icons/tb';
import { IoMdTrophy as Trophy } from 'react-icons/io';

interface PrizeBreakdown {
  descricaoFaixa: string;
  faixa: number;
  numeroDeGanhadores: number;
  valorPremio: number;
}

interface LotteryResult {
  acumulado: boolean;
  dataApuracao: string;
  dataProximoConcurso: string;
  dezenasSorteadasOrdemSorteio: string[];
  listaDezenas: string[];
  numero: number;
  localSorteio: string;
  nomeMunicipioUFSorteio: string;
  valorEstimadoProximoConcurso: number;
  listaRateioPremio: PrizeBreakdown[];
  valorArrecadado: number;
  userNumbers?: string[];
  matches?: string[];
  matchCount?: number;
}

interface ResultsDisplayProps {
  result: LotteryResult | null;
  error: string | null;
  isVerifying: boolean;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default function ResultsDisplay({
  result,
  error,
  isVerifying,
}: ResultsDisplayProps) {
  if (isVerifying) {
    return (
      <div className="pt-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse text-semantic-primary">
            Verificando resultado...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <span>
        <span>{error}</span>
      </span>
    );
  }

  if (!result) return null;

  return (
    <div>
      <div>
        <h3 className="flex items-center gap-2">
          <Target className="w-6 h-6" />
          Concurso {result.numero}
        </h3>
      </div>
      <div className="space-y-6">
        {/* Data e Local */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{result.dataApuracao}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{result.nomeMunicipioUFSorteio}</span>
          </div>
        </div>

        {/* Números Sorteados */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Números Sorteados
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.listaDezenas.map((number) => (
              <span
                key={number}
                className="w-10 h-10 flex items-center justify-center bg-semantic-primary text-white rounded-full font-semibold"
              >
                {number.padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>

        {/* Seus Números (if provided) */}
        {result.userNumbers && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Seus Números
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.userNumbers.map((number) => (
                <span
                  key={number}
                  className={`w-10 h-10 flex items-center justify-center 
                    ${result.matches?.includes(number) ? 'bg-green-500' : 'bg-gray-200'} 
                    ${result.matches?.includes(number) ? 'text-white' : 'text-gray-700'}
                    rounded-full font-semibold transition-colors`}
                >
                  {number.padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Premiação */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-medium">Premiação</h3>
          </div>

          <div className="space-y-4">
            {result.listaRateioPremio.map((prize) => (
              <div
                key={prize.faixa}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{prize.descricaoFaixa}</p>
                  <p className="text-sm text-gray-500">
                    {prize.numeroDeGanhadores} ganhador
                    {prize.numeroDeGanhadores !== 1 ? 'es' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-semantic-primary">
                    {formatCurrency(prize.valorPremio)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Próximo Concurso */}
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Próximo Concurso</h3>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {result.dataProximoConcurso}
            </div>
            <div>
              <p className="text-sm text-gray-500">Prêmio estimado:</p>
              <p className="font-semibold text-semantic-primary">
                {formatCurrency(result.valorEstimadoProximoConcurso)}
              </p>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="pt-4 border-t text-sm text-gray-500">
          <p>Arrecadação total: {formatCurrency(result.valorArrecadado)}</p>
          {result.acumulado && (
            <p className="text-semantic-primary font-medium mt-1">
              Prêmio Acumulado!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
