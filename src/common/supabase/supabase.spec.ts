import { describe, expect, it } from 'vitest'
import { tableCoinWave } from './tableCoinWave'
// @ts-ignore
import { fetchContinuousKlines } from '../../main/fetch-binance/fetchContinuousKlines'
import { tableChore } from './tableChore'
import { tableCoinAlertSetting } from './tableCoinAlertSetting'
import { tableLog } from './tableLog'
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
      const klines = await fetchContinuousKlines('SUI')
      const data = await tableCoinWave.updateTableRowCoinWave('SUI', klines)
      console.log(data)
      expect(data?.res?.status === 200).toBeTruthy()
    },
    {
      timeout: 10000
    }
  ),
  it('supabaseTableLog', async () => {
    const data = await tableLog.addLog('BTC', 1, 'test')
    expect(data?.status === 201).toBeTruthy()
  })
  it('tableChore', async () => {
    const res = await tableChore.getNodes()
    const text = res.data?.[0].value
    expect(text).toBeDefined()
    const resNew = await tableChore.saveNote('value')
    console.log(resNew)
    expect(resNew?.status === 204).toBeTruthy()
  }),
  it('tableCoinAlertSetting', async () => {
    const res = await tableCoinAlertSetting.getCoinAlertSetting('BTC')
    console.log(res)
    expect(res.id === 'BTC').toBeTruthy()
    const newRow = {
      id: 'BTC',
      15: 0,
      30: 0,
      60: 0,
      120: 0,
      240: 0,
      360: 0,
      480: 0,
      600: 1
    }
    const resNew = await tableCoinAlertSetting.setCoinAlertSetting('BTC', newRow)
    expect(resNew?.status === 204).toBeTruthy()
    const newRowFromDB = await tableCoinAlertSetting.getCoinAlertSetting('BTC')
    expect(newRowFromDB[600] === 1).toBeTruthy()
  })
})
