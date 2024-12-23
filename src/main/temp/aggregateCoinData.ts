import { readFileSync, writeFileSync } from 'node:fs'
import { fetchContinuousKlinesAllBySize } from '../fetch-binance/fetchContinuousKlinesAll'
import { getCoinAnalysisMap } from '../../common/getCoinAnalysis'
import { MAIN_COINS } from '../../common/coins/MAIN_COINS'
import { AYALYSIS_TIME } from '../../common/const'
const dir = import.meta.url.split('/').slice(0, -1).join('/').replace('file://', '')
const targetFilePath = `${dir}/coin-klines/index.ts`
async function aggregateCoinData(
  coin,
  interval: 1 | 3 | 5 | 15 | 60 | 120 | 240,
  size = 1000 * 3,
  failRetry = 20,
  timeOut = 1000 * 60 * 10
) {
  const klines = await fetchContinuousKlinesAllBySize(coin, interval, size, failRetry, timeOut)
  const map = getCoinAnalysisMap(klines)
  let beforeContent = readFileSync(targetFilePath, 'utf-8')
  const newContent = `\nexport const ${coin}_${interval}m = ` + JSON.stringify(map, null, 4)
  writeFileSync(targetFilePath, beforeContent + newContent)
}

async function runTask() {
  writeFileSync(targetFilePath, '')
  for (const coin of MAIN_COINS) {
    for (const interval of AYALYSIS_TIME) {
      const timeStart = Date.now()
      const taskName = `${coin}_${interval}m`
      console.log(taskName + ' start')
      // @ts-ignore
      await aggregateCoinData(coin, interval)
      const timeEnd = Date.now()
      console.log(taskName + ' end', (timeEnd - timeStart) / 1000 + 's')
    }
  }
}

runTask()
