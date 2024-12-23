import { MAIN_COINS } from '../../common/coins/MAIN_COINS'
import { electronLog } from '../electron-log'
import { fetchContinuousKlines } from '../fetch-binance/fetchContinuousKlines'
import { logBigChange } from './logBigChange'

export async function runAutoUpdateTask() {
  electronLog.log('开始更新-runAutoUpdateTask')
  await logBigChange.initCoinAlertSetting()
  for (const coin of MAIN_COINS) {
    try {
      const klines = await fetchContinuousKlines(coin,{
        limit: 600,
        interval: 1,
        endTime: Date.now()
      })
      logBigChange.logBigChangeFn(coin, klines)
    } catch (error) {
      // @ts-ignore
      electronLog.log(coin + 'runTask出错！！！', error)
    }
  }
  electronLog.log('更新完成-runAutoUpdateTask')
  setTimeout(runAutoUpdateTask, 1000 * 60 * 1)
}
