import { describe, expect, it } from 'vitest'
import { tableCoinWave } from './tableCoinWave'
// @ts-ignore
import { fetchContinuousKlines } from '../../main/fetch-binance/fetchContinuousKlines'
import { supabaseTableLog } from './tableLog'
import { tableChore } from './tableChore'
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
  it(
    'updateTableRowCoinWave',
    async () => {
      const klines = await fetchContinuousKlines('SUI', 600, 1)
      const data = await tableCoinWave.updateTableRowCoinWave('SUI', klines)
      expect(data?.res?.status === 200).toBeTruthy()
    },
    {
      timeout: 10000
    }
  ),
  it('supabaseTableLog', async () => {
    const data = await supabaseTableLog('test', 'test')
    expect(data?.status === 201).toBeTruthy()
  })
  it('tableChore', async () => {
    const res = await tableChore.getNodes()
    const text = res.data?.[0].value
    expect(text).toBeDefined()
    const resNew = await tableChore.saveNote('value')
    console.log(resNew)
    expect(resNew?.status === 204).toBeTruthy()
  })
})
