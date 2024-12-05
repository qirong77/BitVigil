import { writeFileSync } from 'fs'
import { FEATURE_COINS } from './FEATURE_COINS'

import { MAIN_COINS } from './MAIN_COINS'
import { qirongMark } from './qirongMark'
const LIMIT = 150
const COINS_WITHOUT_MAIN = Array.from(
  new Set(
    FEATURE_COINS.filter((item) => {
      if(!item.symbol.endsWith('USDT')) return false
      const coin = item.symbol.replace('USDT', '')
      if(MAIN_COINS.includes(coin)) return false
      if(qirongMark.includes(coin)) return false
      return true
    }).map((item) => item.symbol.replace('USDT', ''))
  )
)
console.log(FEATURE_COINS.length)
console.log(COINS_WITHOUT_MAIN.length)
async function run() {
  const validCois: string[] = []
  let index = 0
  for (const coin of COINS_WITHOUT_MAIN) {
    console.log('开始' + index, coin)
    if(index > LIMIT) break
    index++
    try {
      const data = await fetchContinuousKlines(coin)
      // @ts-ignore
      if (Array.isArray(data) && data.length) {
        // k 线没有变化，认为下线了，不是有效币
        const fail1 = data[0].high === data[0].low
        const fail2 = data[1].high === data[1].low
        const fail3 = data[2].high === data[2].low
        if (fail1 && fail2 && fail3) {
          console.log('无效币', coin)
          continue
        }
        validCois.push(coin)
        await sleep(Math.random() * 300)
      } else {
        console.log('请求失败', coin, data)
      }
    } catch (error) {
      console.log(coin)
    }
  }
  writeFileSync(
    './validateFeatureCoin.ts',
    `export const MEME_COINS = ${JSON.stringify(validCois)}`
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
run()
