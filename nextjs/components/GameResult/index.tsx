import React from 'react';
import { GameType } from '@/types/loteria';
import { BaseCard } from './BaseCard';
import { NumberBall } from './Number';
import { Clover } from './Clover';
import { gameThemes } from '@/const/games';
import FederalResult from './Federal';
import LotecaResult from './Loteca';
import Winners from './Winners';
import { Settings } from '@/sanity.types';
import { IoLogoWhatsapp, IoLogoInstagram } from 'react-icons/io5';

interface GameResultProps {
  game: GameType;
  data: any;
  settings: Settings;
}

function handleContent(game: GameType, data: any) {
  switch (game) {
    case 'federal':
      return <FederalResult data={data} />;
    case 'loteca':
      return <LotecaResult data={data} />;
    case 'duplasena':
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500 mb-2">1º Sorteio</div>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(data.listaDezenas) &&
                data.listaDezenas.map((numero: string) => (
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
          {Array.isArray(data.dezenasSorteadasOrdemSorteio) &&
            data.dezenasSorteadasOrdemSorteio.map(
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
          {(data.listaDezenas || data?.dezenas)?.map((numero: string) => (
            <NumberBall key={numero} number={numero} game={game} />
          ))}
        </div>
      );
  }
}

export function GameResult({ game, data, settings }: GameResultProps) {
  const theme = gameThemes[game as keyof typeof gameThemes];

  const getWhatsAppMessage = () => {
    const baseMessage = settings?.contactInfo?.whatsapp || '';
    return encodeURIComponent(
      `${baseMessage}\n\nGostaria de apostar na ${game.toUpperCase()}\nConcurso: ${data.numero}\nData: ${data.dataProximoConcurso}`
    );
  };

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

        {game === 'diadesorte' && data.nomeTimeCoracaoMesSorte && (
          <div>
            <div className="text-sm text-gray-500">Mês da Sorte</div>
            <div className="font-bold">{data.nomeTimeCoracaoMesSorte}</div>
          </div>
        )}

        {game === 'maismilionaria' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Trevos Sorteados:</span>
            <div className="flex gap-2">
              {data.trevosSorteados?.map((trevo: string) => (
                <Clover key={trevo} number={trevo} game={game} />
              ))}
            </div>
          </div>
        )}

        {/* Winners & Prize section for non-Federal games */}
        {game !== 'federal' && data.listaRateioPremio && (
          <Winners data={data} />
        )}

        {/* Accumulation */}
        {data.acumulado && game !== 'federal' && game !== 'loteca' && (
          <div className="mt-4 text-center font-bold text-xl md:text-2xl text-semantic-primary">
            ACUMULOU!
          </div>
        )}

        {/* Next Prize */}
        {data.acumulado &&
          game !== 'federal' &&
          data.valorEstimadoProximoConcurso && (
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
            </div>
          )}

        {data.dataProximoConcurso && (
          <div className="mt-6 rounded-lg p-4 bg-semantic-primary-bg border shadow-sm">
            <div className="text-center space-y-3">
              <div className="font-semibold text-sm text-semantic-primary">
                Aposte no próximo jogo:
              </div>
              <div className="flex justify-center gap-3">
                {settings?.contactInfo?.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.contactInfo.whatsapp}?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 max-w-36 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-semantic-primary text-white rounded-lg hover:bg-semantic-primary-600 transition-colors"
                  >
                    <IoLogoWhatsapp className="text-xl" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {settings?.socialMedia?.instagram?.url && (
                  <a
                    href={settings.socialMedia.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 max-w-36 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-semantic-accent text-white rounded-lg hover:bg-semantic-accent-hover transition-colors"
                  >
                    <IoLogoInstagram className="text-xl" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
