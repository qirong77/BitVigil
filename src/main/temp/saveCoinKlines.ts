import { writeFileSync } from 'node:fs'
import { fetchContinuousKlinesAllBySize } from '../fetch-binance/fetchContinuousKlinesAll'
const dir = import.meta.url.split('/').slice(0, -1).join('/').replace('file://', '')
async function saveCoinKlines(
  coin,
  interval: 1 | 3 | 5 | 15 | 60 | 120 | 240,
  size = 1000 * 3
) {
  const klines = await fetchContinuousKlinesAllBySize(coin, interval, size, 30, 1000 * 60 * 10)
  const targetFilePath = `${dir}/coin-klines/${coin}-${interval}m-${size}.json`
  console.log('未去重', klines.length)
  const set = new Set()
  klines.forEach((kline) => {
    set.add(kline.start_time + '-' + kline.end_time)
  })
  console.log('去重后', set.size)
  writeFileSync(targetFilePath, JSON.stringify(klines, null, 2))
}

saveCoinKlines('BTC', 5, 1000 * 3)
 