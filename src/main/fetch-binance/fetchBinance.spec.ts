import { it, expect, describe } from 'vitest'
import { fetchContinuousKlines } from './fetchContinuousKlines'
import { E_CONTINOUS_KLINE_INTERVAL, I_continuous_klines } from '../../common/types'
import { fetchContinuousKlinesAllBySize } from './fetchContinuousKlinesAll'

describe('fetch-binance', () => {
  it('fetchContinuousKlines', async () => {
    const res = (await fetchContinuousKlines('ETH')) as I_continuous_klines[]
    expect(res.length > 0).toBeTruthy()
    expect(res[0].low > 0).toBeTruthy()
    expect(res[0].high > 0).toBeTruthy()
  })
  it('fetchContinuousKlinesAllBySize', async () => {
    const res1 = (await fetchContinuousKlinesAllBySize('SUI', 5, 1000 * 1)) as I_continuous_klines[]
    expect(res1.length === 1000).toBeTruthy()
  })
  it('fetchContinuousKlinesAllBySize重复率检测', async () => {
    const klines = (await fetchContinuousKlinesAllBySize('SUI', 5, 1000 * 5)) as I_continuous_klines[]
    const set = new Set()
    klines.forEach((kline) => {
      set.add(kline.start_time + '-' + kline.end_time)
    })
    expect(klines.length === set.size).toBeTruthy()
  })
  it('fetchContinuousKlinesAllBySize超出时间范围', async () => {
    const klines = (await fetchContinuousKlinesAllBySize('SUI', E_CONTINOUS_KLINE_INTERVAL.SIX_HOUR, 1000 * 10)) as I_continuous_klines[]
    console.log(klines.length)
  })
  it('fetchContinuousKlinesAllBySize小范围', async () => {
    const klines = (await fetchContinuousKlinesAllBySize('SUI', E_CONTINOUS_KLINE_INTERVAL.ONE_MIN, 600)) as I_continuous_klines[]
    console.log(klines.length)
    expect(klines.length === 600).toBeTruthy()
  })
  it('fetchContinuousKlinesAllBySize较大范围', async () => {
    const klines = (await fetchContinuousKlinesAllBySize('SUI', E_CONTINOUS_KLINE_INTERVAL.ONE_MIN, 3500)) as I_continuous_klines[]
    console.log(klines.length)
    expect(klines.length === 3500).toBeTruthy()
  })
})
