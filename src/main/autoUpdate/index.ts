import { MAIN_COINS } from '../../common/coins/MAIN_COINS'
import { tableCoinWave } from '../../common/supabase/tableCoinWave'
import { fetchContinuousKlines } from '../fetch-binance/fetchContinuousKlines'

export async function runAutoUpdateTask() {
  for (const coin of MAIN_COINS) {
    try {
      const klines = await fetchContinuousKlines(coin, 600, 1)
      await tableCoinWave.updateTableRowCoinWave(coin, klines)
    } catch (error) {
      console.log('runTask出错！！！', coin)
      console.log(error)
    }
  }
  setTimeout(runAutoUpdateTask, 1000 * 60 * 3)
}
