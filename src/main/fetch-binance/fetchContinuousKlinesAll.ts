import { I_continuous_klines } from '../../common/types'
import { fetchContinuousKlines } from './fetchContinuousKlines'

const SIZE_EVERY_REQUEST = 1000
export async function fetchContinuousKlinesByDays(
  coin,
  interval: 1 | 3 | 5 | 15 | 60 | 120 | 240,
  days: number
) {
  const timeGap = interval * 60 * 1000 * 1000
  const klinesAll: I_continuous_klines[] = []
  const size = Math.ceil((days * 24 * 60) / interval / SIZE_EVERY_REQUEST)
  for (let i = 0; i < size; i++) {
    const klines = await fetchContinuousKlines(coin, {
      limit: SIZE_EVERY_REQUEST,
      interval,
      endTime: Date.now() - i * timeGap
    })
    klinesAll.push(...klines)
  }
  return klinesAll
}

export async function fetchContinuousKlinesAllBySize(
  coin,
  interval: 1 | 3 | 5 | 15 | 60 | 120 | 240,
  minSize = 1000 * 5
) {
  const timeGap = interval * 60 * 1000 * 1000
  const klinesAll: I_continuous_klines[] = []
  const iteration = Math.ceil(minSize / SIZE_EVERY_REQUEST)
  for (let i = 0; i < iteration; i++) {
    const klines = await fetchContinuousKlines(coin, {
      limit: SIZE_EVERY_REQUEST,
      interval,
      endTime: Date.now() - i * timeGap
    })
    klinesAll.push(...klines)
  }
  return klinesAll
}
