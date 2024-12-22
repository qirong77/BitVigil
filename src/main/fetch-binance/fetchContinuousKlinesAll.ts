import { I_continuous_klines } from "../../common/types"
import { fetchContinuousKlines } from "./fetchContinuousKlines"

export async function fetchContinuousKlinesAll(coin, interval : 5 | 15 | 60 | 120 | 240,size = 10) {
  const timeGap = interval * 60 * 1000 * 1000
  const klinesAll:I_continuous_klines[] = []
  for(let i = 0; i < size; i++) {
    const klines = await fetchContinuousKlines(coin, 1000, interval,1000 * 20, Date.now() - i * timeGap)
    klinesAll.push(...klines)
  }
  return klinesAll
}


