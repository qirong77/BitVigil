import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fetchContinuousKlinesAllBySize } from '../fetch-binance/fetchContinuousKlinesAll'
import { getCoinAnalysisMap } from '../../common/getCoinAnalysis'
import { MAIN_COINS } from '../../common/coins/MAIN_COINS'
import { ANALYSIS_TIME } from '../../common/const'
import { E_CONTINOUS_KLINE_INTERVAL } from '../../common/types'
const dir = import.meta.url.split('/').slice(0, -1).join('/').replace('file://', '')
const targetFilePath = `${dir.replace('main/temp','common')}/coin-klines-statistic/index.json`
console.log(targetFilePath)
async function aggregateCoinData(
  coin,
  interval: E_CONTINOUS_KLINE_INTERVAL,
  size = 1000 * 10,
  failRetry = 20,
  timeOut = 1000 * 60 * 30
) {
  const klines = await fetchContinuousKlinesAllBySize(coin, interval, size, failRetry, timeOut)
  const map = getCoinAnalysisMap(klines)
  const o = JSON.parse(readFileSync(targetFilePath, 'utf-8'))
  const key = `${coin}_${interval}m`
  o[key] = {
    interval,
    size,
    map
  }
  writeFileSync(targetFilePath, JSON.stringify(o))
}

async function runTask() {
  if(!existsSync(targetFilePath)) {
    writeFileSync(targetFilePath, '{}')
  }
  try {
    for (const coin of MAIN_COINS) {
      for (const interval of ANALYSIS_TIME) {
        const timeStart = Date.now()
        const taskName = `${coin}_${interval}m`
        console.log(taskName + ' start')
        // @ts-ignore
        await aggregateCoinData(coin, interval)
        const timeEnd = Date.now()
        console.log(taskName + ' end', (timeEnd - timeStart) / 1000 + 's')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

runTask()
