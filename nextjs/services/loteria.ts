// app/(resultados)/services/lottery.ts
import redis from '@/services/redis'

export interface LotteryResult {
  loteria: string;
  numero: string;
  data: string;
  dezenas: string[];
  premiacoes: {
    acertos: string;
    vencedores: number;
    premio: string;
  }[];
  acumulou: boolean;
  dataProximoConcurso: string;
  numeroConcurso: number;
}

export type GameType = 'megasena' | 'lotofacil' | 'quina';

async function fetchResult(game: GameType, contestNumber?: number): Promise<LotteryResult> {
  const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${game}/${contestNumber || ''}`
  
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'origin': 'https://loterias.caixa.gov.br',
    },
    next: { revalidate: 60 } // Cache for 1 minute to avoid hammering the API
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${game} result`)
  }

  return response.json()
}

export async function getLotteryResult(game: GameType, contestNumber?: number): Promise<LotteryResult> {
  const cacheKey = `lottery:${game}:${contestNumber || 'latest'}`
  
  try {
    // Try to get from Redis first
    const cachedResult = await redis.get(cacheKey)
    if (cachedResult) {
      return cachedResult as LotteryResult
    }

    // If not in cache, fetch from API
    const result = await fetchResult(game, contestNumber)
    
    if (contestNumber) {
      // If it's a specific contest number, store indefinitely (no expiration)
      await redis.set(cacheKey, result)
      
      // Also store by date for alternative lookup
      const dateKey = `lottery:${game}:date:${result.data.split('T')[0]}`
      await redis.set(dateKey, result)
    } else {
      // For 'latest' results, store with expiration since they change
      await redis.set(cacheKey, result, { ex: 3600 }) // 1 hour expiration
      
      // Store the actual result permanently by contest number
      const contestKey = `lottery:${game}:${result.numeroConcurso}`
      await redis.set(contestKey, result)
    }
    
    return result
  } catch (error) {
    console.error('Redis error:', error)
    // Fallback to direct API call if Redis fails
    return fetchResult(game, contestNumber)
  }
}

export async function getResultByDate(game: GameType, date: string): Promise<LotteryResult | null> {
  const dateKey = `lottery:${game}:date:${date}`
  return redis.get(dateKey) as Promise<LotteryResult | null>
}

export async function updateAllResults() {
  const games: GameType[] = ['megasena', 'lotofacil', 'quina']
  
  try {
    const results = await Promise.all(
      games.map(game => getLotteryResult(game))
    )
    
    // Store next draw dates with expiration since they change
    const nextDraws = results.map(result => ({
      game: result.loteria,
      nextDraw: result.dataProximoConcurso,
      contestNumber: result.numeroConcurso
    }))
    
    await redis.set('lottery:nextDraws', nextDraws, { ex: 3600 })
    
    // Store each result permanently by contest number
    await Promise.all(
      results.map(result => {
        const contestKey = `lottery:${result.loteria}:${result.numeroConcurso}`
        return redis.set(contestKey, result)
      })
    )
    
    return results
  } catch (error) {
    console.error('Failed to update lottery results:', error)
    throw error
  }
}

// Helper function to get last N results
export async function getLastResults(game: GameType, count: number = 5): Promise<LotteryResult[]> {
  try {
    // Get latest result first to know the most recent contest number
    const latest = await getLotteryResult(game)
    const latestNumber = latest.numeroConcurso
    
    // Fetch the last N results
    const promises = Array.from({ length: count }, (_, i) => {
      const contestNumber = latestNumber - i
      return getLotteryResult(game, contestNumber)
    })
    
    return Promise.all(promises)
  } catch (error) {
    console.error(`Failed to fetch last ${count} results for ${game}:`, error)
    throw error
  }
}