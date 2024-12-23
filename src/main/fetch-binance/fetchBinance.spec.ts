import { it, expect, describe, test } from 'vitest' // 确保使用正确的导入
import { fetchContinuousKlines } from './fetchContinuousKlines'
import { I_continuous_klines } from '../../common/types'
import { fetchContinuousKlinesAllBySize } from './fetchContinuousKlinesAll'

describe('fetch-binance', () => {
  it('fetchContinuousKlines', async () => {
    const res = (await fetchContinuousKlines('ETC')) as I_continuous_klines[]
    expect(res.length > 0).toBeTruthy()
    expect(res[0].low > 0).toBeTruthy()
    expect(res[0].high > 0).toBeTruthy()
  })
  it('fetchContinuousKlinesAllBySize', async () => {
    const res1 = (await fetchContinuousKlinesAllBySize('SUI', 5, 1000 * 1)) as I_continuous_klines[]
    expect(res1.length === 1000).toBeTruthy()
  })
})
