// import { getKlineInfo, IKlineInfo } from '../../common/kline/getKlineInfo'
// import { I_continuous_klines } from '../../common/types'
// import { fetchContinuousKlines } from '../fetch-binance/fetchContinuousKlines'
// import { getTicks } from './getTicks'

// function getChangeInfos(klines: I_continuous_klines[]) {
//   const changeInfos = klines
//     .map((kline) => {
//       return getKlineInfo([kline])!
//     })
//     .sort((a, b) => {
//       return b!.changePercentNumber - a!.changePercentNumber
//     })
//   return changeInfos
// }

// function addValue(value, o, item) {
//   for (const part of Object.values(o)) {
//     // @ts-ignore
//     const section = part.section
//     if (value >= section[0] && value <= section[1]) {
//       // @ts-ignore
//       part.items.push(item)
//       return
//     }
//   }
// }

// function getMap(changeInfos: IKlineInfo[]) {
//   const p10Index = Math.floor(changeInfos.length * 0.1)
//   const min = changeInfos[p10Index].changePercentNumber * 100
//   const max = changeInfos[0].changePercentNumber * 100
//   const ticks = getTicks(min, max, 8)
//   const o = {}
//   for (let i = 0; i < ticks.length - 1; i++) {
//     const tick = ticks[i]
//     const nextTick = ticks[i + 1]
//     o[tick + '% - ' + nextTick + '%'] = {
//       section: [tick, nextTick],
//       items: []
//     }
//   }
//   changeInfos.slice(0, p10Index).forEach((changeInfo) => {
//     addValue(changeInfo.changePercentNumber * 100, o, changeInfo)
//   })
//   return o
// }

// async function task() {
//   const klines = await fetchContinuousKlines('BTC')
//   const changeInfos = getChangeInfos(klines)
//   const o = getMap(changeInfos)
//   console.log(o)
// }

// task()
// console.log(import.meta.url)
// const dir = import.meta.url.split('/').slice(0, -1).join('/').replace('file:///', '')
// console.log(dir)
