import { MAIN_COINS } from '../../common/coins/MAIN_COINS'
import { tableCoinWave } from '../../common/supabase/tableCoinWave'
import { electronLog } from '../electron-log'
import { fetchContinuousKlines } from '../fetch-binance/fetchContinuousKlines'
import { logBigChange } from './logBigChange'

export async function runAutoUpdateTask() {
  electronLog.log('开始更新-runAutoUpdateTask')
  await logBigChange.initCoinAlertSetting()
  for (const coin of MAIN_COINS) {
    try {
      const klines = await fetchContinuousKlines(coin, 600, 1, 1000 * 20)
      await tableCoinWave.updateTableRowCoinWave(coin, klines)
      logBigChange.logBigChangeFn(coin, klines)
    } catch (error) {
      // @ts-ignore
      electronLog.log(coin + 'runTask出错！！！', error)
    }
  }
  electronLog.log('更新完成-runAutoUpdateTask')
  setTimeout(runAutoUpdateTask, 1000 * 60 * 1.5)
}
