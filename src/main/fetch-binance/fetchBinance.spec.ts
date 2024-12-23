import { it, expect, describe } from 'vitest' // 确保使用正确的导入
import { fetchContinuousKlines } from './fetchContinuousKlines'
import { I_continuous_klines } from '../../common/types'
import { fetchContinuousKlinesAllBySize } from './fetchContinuousKlinesAll'

describe('fetch-binance', () => {
  it(
    'fetchContinuousKlines',
    async () => {
      const res = (await fetchContinuousKlines('ETC')) as I_continuous_klines[]
      console.log(res)
      expect(res.length > 0).toBeTruthy()
      expect(res[0].low > 0).toBeTruthy()
      expect(res[0].high > 0).toBeTruthy()
    },
    { timeout: 10000 } // 设置超时时间为 5000 毫秒（5 秒）
  ),
    it(
      'fetchContinuousKlinesAllBySize',
      async () => {
        const res1 = (await fetchContinuousKlinesAllBySize(
          'SUI',
          5,
          1000 * 10
        )) as I_continuous_klines[]
        expect(res1.length === 1000).toBeTruthy()
      },
      { timeout: 1000 * 60 * 10 }
    )
})
