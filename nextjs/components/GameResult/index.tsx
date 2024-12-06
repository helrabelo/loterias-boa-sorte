import { GameType } from '@/types/loteria';
import { BaseCard } from './BaseCard';
import { NumberBall } from './Number';

interface GameResultProps {
  game: GameType;
  data: any;
}

export function GameResult({ game, data }: GameResultProps) {
  return (
    <BaseCard game={game}>
      <div className="space-y-4">
        {/* Contest Info */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-gray-500">Concurso</div>
            <div className="font-bold text-lg">{data.numero}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Data do sorteio</div>
            <div>{data.dataApuracao}</div>
          </div>
        </div>

        {/* Numbers Section */}
        {game === 'duplasena' ? (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-2">1º Sorteio</div>
              <div className="flex flex-wrap gap-2">
                {data.listaDezenas.map((numero: string) => (
                  <NumberBall key={numero} number={numero} game={game} />
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">2º Sorteio</div>
              <div className="flex flex-wrap gap-2">
                {data.listaDezenasSegundoSorteio?.map((numero: string) => (
                  <NumberBall key={numero} number={numero} game={game} />
                ))}
              </div>
            </div>
          </div>
        ) : game === 'supersete' ? (
          <div className="grid grid-cols-7 gap-2">
            {data.dezenasSorteadasOrdemSorteio.map(
              (numero: string, index: number) => (
                <div key={index}>
                  <div className="text-xs text-gray-500 text-center mb-1">
                    Col {index + 1}
                  </div>
                  <NumberBall number={numero} game={game} />
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.listaDezenas?.map((numero: string) => (
              <NumberBall key={numero} number={numero} game={game} />
            ))}
          </div>
        )}

        {/* Game Specific Sections */}
        {game === 'timemania' && data.nomeTimeCoracao && (
          <div>
            <div className="text-sm text-gray-500">Time do Coração</div>
            <div className="font-bold">{data.nomeTimeCoracao}</div>
          </div>
        )}

        {game === 'diasorte' && data.nomeTimeCoracaoMesSorte && (
          <div>
            <div className="text-sm text-gray-500">Mês da Sorte</div>
            <div className="font-bold">{data.nomeTimeCoracaoMesSorte}</div>
          </div>
        )}

        {/* Winners & Prize */}
        <div>
          {data.listaRateioPremio?.map((premio: any, index: number) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b last:border-0"
            >
              <div className="text-sm">
                {premio.descricaoFaixa} ({premio.numeroDeGanhadores} ganhadores)
              </div>
              <div className="font-bold">
                {premio.valorPremio.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Accumulation */}
        {data.acumulado && (
          <div className={`mt-4 text-center font-bold text-lg color-${game}`}>
            ACUMULOU!
          </div>
        )}

        {/* Next Prize */}
        <div className="mt-4">
          <div className="text-sm text-gray-500">
            Estimativa de prêmio do próximo concurso:
          </div>
          <div className="font-bold text-lg">
            {data.valorEstimadoProximoConcurso.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
          <div className="text-sm text-gray-500">
            Sorteio em {data.dataProximoConcurso}
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
