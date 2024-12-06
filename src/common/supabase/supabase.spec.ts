import { describe, expect, it } from 'vitest'
import { tableCoinWave } from './tableCoinWave'
// @ts-ignore
import { fetchContinuousKlines } from '../../main/fetch-binance/fetchContinuousKlines'
describe('supabase', () => {
  it(
    'supabase',
    async () => {
      const res = await tableCoinWave.getTableRowCoinWave('BTC')
      console.log(res)
      expect(res?.length > 0).toBeTruthy()
    },
    {
      timeout: 10000
    }
  ),
    it('updateTableRowCoinWave', async () => {
      const klines = await fetchContinuousKlines('BTC', 600, 1)
      const res = await tableCoinWave.updateTableRowCoinWave('BTC', klines)
      expect(res?.status === 200).toBeTruthy()
    })
})
