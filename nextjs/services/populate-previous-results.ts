import { BaseResult, DiaSorte, DuplaSena, Federal, GameType, LotteryResult, SuperSete, TimeMania } from '@/types/loteria';
import redis from '@/services/redis';

// Utility to add delay between requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchResult(game: GameType, contestNumber: number) {
  try {
    const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${game}/${contestNumber}`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        origin: 'https://loterias.caixa.gov.br',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${game} contest ${contestNumber}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${game} contest ${contestNumber}:`, error);
    return null;
  }
}

interface PopulateOptions {
  batchSize?: number; // How many contests to fetch in parallel
  delayBetweenBatches?: number; // Delay in ms between batches
  startFrom?: number; // Optional starting contest number
}

export async function populateHistoricalResults(
  game: GameType,
  latestContest: number,
  options: PopulateOptions = {}
) {
  const {
    batchSize = 5,
    delayBetweenBatches = 2000, // 2 seconds between batches
    startFrom = 1,
  } = options;

  console.log(
    `Starting historical population for ${game} from ${startFrom} to ${latestContest}`
  );

  // Create batches of contest numbers
  const contestNumbers: number[] = [];
  for (let i = latestContest - 1; i >= startFrom; i--) {
    contestNumbers.push(i);
  }

  const batches = [];
  for (let i = 0; i < contestNumbers.length; i += batchSize) {
    batches.push(contestNumbers.slice(i, i + batchSize));
  }

  let successCount = 0;
  let failureCount = 0;

  // Process each batch
  for (const [index, batch] of batches.entries()) {
    console.log(`Processing batch ${index + 1}/${batches.length} for ${game}`);

    const results = await Promise.all(
      batch.map(async (contestNumber) => {
        const cacheKey = `lottery:${game}:${contestNumber}`;

        // Check if already in cache
        const cached = await redis.get(cacheKey);
        if (cached) {
          console.log(`Contest ${contestNumber} already in cache`);
          successCount++;
          return null;
        }

        const result = await fetchResult(game, contestNumber);
        if (result) {
          // Store in Redis indefinitely
          await redis.set(cacheKey, result);
          // Also store by date
          await redis.set(`lottery:${game}:date:${result.data}`, result);
          successCount++;
          return result;
        } else {
          failureCount++;
          return null;
        }
      })
    );

    // Wait before processing next batch
    if (index < batches.length - 1) {
      await delay(delayBetweenBatches);
    }
  }

  return {
    game,
    totalProcessed: contestNumbers.length,
    successCount,
    failureCount,
  };
}

const latestResults: Record<GameType, Partial<LotteryResult>> = {
  maismilionaria: {
    loteria: 'maismilionaria',
    numeroConcurso: 204,
    data: '2024-12-04',
    dezenas: ['07', '09', '11', '15', '17', '42'],
    acumulou: true,
    dataProximoConcurso: '2024-12-07',
    valorEstimadoProximoConcurso: 27500000,
  },
  megasena: {
    loteria: 'megasena',
    numeroConcurso: 2804,
    data: '2024-12-05',
    dezenas: ['14', '24', '25', '31', '33', '60'],
    acumulou: true,
    dataProximoConcurso: '2024-12-07',
    valorEstimadoProximoConcurso: 27000000,
  },
  lotofacil: {
    loteria: 'lotofacil',
    numeroConcurso: 3261,
    data: '2024-12-05',
    dezenas: [
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '10',
      '11',
      '12',
      '14',
      '15',
      '16',
      '21',
      '24',
      '25',
    ],
    acumulou: false,
    dataProximoConcurso: '2024-12-06',
    valorEstimadoProximoConcurso: 1700000,
  },
  quina: {
    loteria: 'quina',
    numeroConcurso: 6599,
    data: '2024-12-05',
    dezenas: ['18', '21', '29', '63', '78'],
    acumulou: false,
    dataProximoConcurso: '2024-12-06',
    valorEstimadoProximoConcurso: 600000,
  },
  timemania: {
    loteria: 'timemania',
    numeroConcurso: 2176,
    data: '2024-12-05',
    dezenas: ['05', '09', '31', '41', '49', '57', '59'],
    acumulou: true,
    dataProximoConcurso: '2024-12-07',
    valorEstimadoProximoConcurso: 13800000,
    timeCoracao: 'OPERARIO /PR',
  } as TimeMania,
  duplasena: {
    loteria: 'duplasena',
    numeroConcurso: 2747,
    data: '2024-12-04',
    dezenas: ['13', '25', '31', '36', '43', '44'],
    dezenas2: ['18', '19', '20', '23', '30', '43'],
    acumulou: true,
    dataProximoConcurso: '2024-12-06',
    valorEstimadoProximoConcurso: 850000,
  } as DuplaSena,
  diadesorte: {
    loteria: 'diadesorte',
    numeroConcurso: 997,
    data: '2024-12-05',
    dezenas: ['02', '03', '07', '17', '19', '21', '29'],
    acumulou: true,
    dataProximoConcurso: '2024-12-07',
    valorEstimadoProximoConcurso: 550000,
    mesSorte: 'Outubro',
  } as DiaSorte,
  supersete: {
    loteria: 'supersete',
    numeroConcurso: 629,
    data: '2024-12-04',
    dezenas: [],
    colunas: {
      1: '7',
      2: '7',
      3: '1',
      4: '7',
      5: '5',
      6: '9',
      7: '4',
    },
    acumulou: true,
    dataProximoConcurso: '2024-12-06',
    valorEstimadoProximoConcurso: 150000,
  } as SuperSete,
  loteca: {
    loteria: 'loteca',
    numeroConcurso: 950,
    data: '2024-12-04',
    dezenas: [],
    acumulou: true,
    dataProximoConcurso: '2024-12-06',
    valorEstimadoProximoConcurso: 300000,
  } as BaseResult,
  federal: {
    loteria: 'federal',
    numeroConcurso: 5562,
    data: '2024-12-04',
    dezenas: [],
    acumulou: false,
    dataProximoConcurso: '2024-12-06',
    valorEstimadoProximoConcurso: 5000000,
    premios: [
      { bilhete: '1', valor: 5000000 },
      { bilhete: '2', valor: 30000 },
      { bilhete: '3', valor: 30000 },
      { bilhete: '4', valor: 30000 },
      { bilhete: '5', valor: 30000 },
    ],
  } as Federal,
  lotomania: {
    loteria: 'lotomania',
    numeroConcurso: 2253,
    data: '2024-12-04',
    dezenas: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '50',
      '51',
      '52',
      '53',
      '54',
      '55',
      '56',
      '57',
      '58',
      '59',
      '60',
      '61',
      '62',
      '63',
      '64',
      '65',
      '66',
      '67',
      '68',
      '69',
      '70',
      '71',
      '72',
      '73',
      '74',
      '75',
      '76',
      '77',
      '78',
      '79',
      '80',
      '81',
      '82',
      '83',
      '84',
      '85',
      '86',
      '87',
      '88',
      '89',
      '90',
      '91',
      '92',
      '93',
      '94',
      '95',
      '96',
      '97',
      '98',
      '99',
      '100',
    ],
    acumulou: true,
    dataProximoConcurso: '2024-12-07',
    valorEstimadoProximoConcurso: 2000000,
  } as BaseResult,
};

export async function populateAllHistoricalResults() {
  const stats = [];

  for (const [game, result] of Object.entries(latestResults)) {
    console.log(`Starting population for ${game}`);

    const gameStats = await populateHistoricalResults(
      game as GameType,
      result.numeroConcurso!,
      {
        batchSize: 5,
        delayBetweenBatches: 2000,
        startFrom: 1,
      }
    );

    stats.push(gameStats);

    // Add delay between games
    await delay(5000); // 5 seconds between games
  }

  return stats;
}
