import { getKlineInfo, IKlineInfo } from '../kline/getKlineInfo'
import { I_continuous_klines } from '../types'
import { getTicks } from './getTicks'

export function getCoinAnalysisMap(klines: I_continuous_klines[]) {
  const changeInfos = klines
    .map((kline) => {
      return getKlineInfo([kline])!
    })
    .sort((a, b) => {
      return b!.changePercentNumber - a!.changePercentNumber
    })
  return getMap(changeInfos)
}

function addValue(value, o) {
  for (const part of Object.values(o)) {
    // @ts-ignore
    const section = part.section
    if (value >= section[0] && value <= section[1]) {
      // @ts-ignore
      part.items += 1
      return
    }
  }
}

function getMap(changeInfos: IKlineInfo[]) {
  const p10Index = Math.floor(changeInfos.length * 0.1)
  const min = changeInfos[p10Index].changePercentNumber * 100
  const max = changeInfos[0].changePercentNumber * 100
  const ticks = getTicks(min, max, 10)
  const o = {}
  for (let i = 0; i < ticks.length - 1; i++) {
    const tick = ticks[i]
    const nextTick = ticks[i + 1]
    o[tick + '% - ' + nextTick + '%'] = {
      section: [tick, nextTick],
      items: 0
    }
  }
  changeInfos.slice(0, p10Index).forEach((changeInfo) => {
    addValue(changeInfo.changePercentNumber * 100, o)
  })
  return o
}
