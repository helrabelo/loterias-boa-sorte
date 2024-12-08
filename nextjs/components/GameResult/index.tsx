import { GameType } from '@/types/loteria';
import { BaseCard } from './BaseCard';
import { NumberBall } from './Number';
import { Clover } from './Clover';
import { gameThemes } from '@/const/games';

interface GameResultProps {
  game: GameType;
  data: any;
}

function handleContent(game: GameType, data: any) {
  switch (game) {
    case 'duplasena':
      return (
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
      );
    case 'supersete':
      return (
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
      );
    default:
      return (
        <div className="flex flex-wrap gap-2">
          {data.listaDezenas?.map((numero: string) => (
            <NumberBall key={numero} number={numero} game={game} />
          ))}
        </div>
      );
  }
}

export function GameResult({ game, data }: GameResultProps) {
  const theme = gameThemes[game as keyof typeof gameThemes];

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

        {handleContent(game, data)}

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

        {game === 'maismilionaria' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Trevos Sorteados:</span>
            <div className="flex gap-2">
              <Clover number={data.trevosSorteados[0]} game={game} />
              <Clover number={data.trevosSorteados[1]} game={game} />
            </div>
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
          <div className="mt-4 text-center font-bold text-xl md:text-2xl text-semantic-primary">
            ACUMULOU!
          </div>
        )}

        {/* Next Prize */}
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500">
            Estimativa de prêmio do próximo concurso:
          </div>
          <div className="font-bold text-lg text-semantic-primary">
            {data.valorEstimadoProximoConcurso.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
          <div className="text-sm text-gray-500">
            Próximo sorteio:{' '}
            <span className="underline underline-offset-4">
              {data.dataProximoConcurso}
            </span>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
