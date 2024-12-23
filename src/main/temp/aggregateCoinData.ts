import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fetchContinuousKlinesAllBySize } from '../fetch-binance/fetchContinuousKlinesAll'
import { getCoinAnalysisMap } from '../../common/getCoinAnalysis'
const dir = import.meta.url.split('/').slice(0, -1).join('/').replace('file://', '')

async function aggregateCoinData(
  coin,
  interval: 1 | 3 | 5 | 15 | 60 | 120 | 240,
  size = 1000 * 5,
  failRetry = 20,
  timeOut = 1000 * 60 * 10
) {
  const klines = await fetchContinuousKlinesAllBySize(coin, interval, size, failRetry, timeOut)
  const map = getCoinAnalysisMap(klines)
  const targetFilePath = `${dir}/coin-klines/index.ts`
  if (!existsSync(targetFilePath)) {
    writeFileSync(targetFilePath, '')
  }
  let beforeContent = readFileSync(targetFilePath, 'utf-8')
  const newContent =
    `\nexport const ${coin}_${interval}m = ` + JSON.stringify(map, null, 4)

  writeFileSync(targetFilePath, beforeContent + newContent)
}



