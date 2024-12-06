import { MAIN_COINS } from '../../common/coins/MAIN_COINS'
import { tableCoinWave } from '../../common/supabase/tableCoinWave'
import { fetchContinuousKlines } from '../fetch-binance/fetchContinuousKlines'

export async function runAutoUpdateTask() {
  for (const coin of MAIN_COINS) {
    try {
      console.log('开始更新', coin)
      const klines = await fetchContinuousKlines(coin, 600, 1,1000 * 15)
      await tableCoinWave.updateTableRowCoinWave(coin, klines)
      console.log('更新完成', coin)
    } catch (error) {
      console.log('runTask出错！！！', coin)
      console.log(error)
    }
  }
  setTimeout(runAutoUpdateTask, 1000 * 60 * 3)
}
