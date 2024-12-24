import { E_CONTINOUS_KLINE_INTERVAL, I_continuous_klines } from '../../common/types'
import { fetchContinuousKlines } from './fetchContinuousKlines'

const SIZE_EVERY_REQUEST = 1000
// export async function fetchContinuousKlinesByDays(
//   coin,
//   interval: E_CONTINOUS_KLINE_INTERVAL,
//   days: number
// ) {
//   const timeGap = interval * 60 * 1000 * 1000
//   const klinesAll: I_continuous_klines[] = []
//   const size = Math.ceil((days * 24 * 60) / interval / SIZE_EVERY_REQUEST)
//   for (let i = 0; i < size; i++) {
//     const klines = await fetchContinuousKlines(coin, {
//       limit: SIZE_EVERY_REQUEST,
//       interval,
//       endTime: Date.now() - i * timeGap
//     })
//     // 超出时间范围
//     if (klines.length === 0) {
//       return klinesAll
//     }
//     klinesAll.push(...klines)
//   }
//   return klinesAll
// }

export async function fetchContinuousKlinesAllBySize(
  coin,
  interval: E_CONTINOUS_KLINE_INTERVAL,
  minSize = 1000 * 5,
  failRetry = 5,
  timeOut = 1000 * 60 * 10
) {
  const timeGap = interval * 60 * 1000 * SIZE_EVERY_REQUEST
  const klinesAll: I_continuous_klines[] = []
  const iteration = Math.ceil(minSize / SIZE_EVERY_REQUEST)
  for (let i = 0; i < iteration; i++) {
    let klines = await fetchContinuousKlines(
      coin,
      {
        limit: SIZE_EVERY_REQUEST,
        interval,
        endTime: Date.now() - i * timeGap
      },
      {
        failRetry,
        timeOut
      }
    )
    // 超出时间范围
    if (klines.length === 0) {
      return klinesAll
    }
    klinesAll.push(...klines)
  }
  return klinesAll
}
