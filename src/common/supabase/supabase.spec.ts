import { describe, expect, it } from 'vitest'
// @ts-ignore
import { fetchContinuousKlines } from '../../main/fetch-binance/fetchContinuousKlines'
import { tableChore } from './tableChore'
import { tableCoinAlertSetting } from './tableCoinAlertSetting'
import { tableLog } from './tableLog'
describe('supabase', () => {
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
      expect(res.id === 'BTC').toBeTruthy()
      const newRow = {
        id: 'BTC',
        1: 1,
        3: 1,
        5: 1,
        30: 1,
        120: 1,
        360: 1,
        480: 1,
        600: 1,
        720: 1,
      }
      const resNew = await tableCoinAlertSetting.setCoinAlertSetting('BTC', newRow)
      expect(resNew?.status === 204).toBeTruthy()
      const newRowFromDB = await tableCoinAlertSetting.getCoinAlertSetting('BTC')
      expect(newRowFromDB[600] === 1).toBeTruthy()
    })
})
