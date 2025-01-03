import { I_continuous_klines } from '../types'
export interface IKlineInfo {
  min: number
  max: number
  type: string
  changePercentNumber: number
  changePercentStr: string
  isInTrendInRecent: boolean
}
function getKlineInfoSingleKline(kline: I_continuous_klines[]) {
  const item = kline[0]
  const changePercentNumber = Math.abs(item.start_time_price - item.end_time_price) / item.end_time_price
  return {
    min: Math.min(item.end_time_price, item.start_time_price),
    max: Math.max(item.end_time_price, item.start_time_price),
    type: '',
    changePercentNumber: Number(changePercentNumber.toFixed(4)),
    changePercentStr: changePercentNumber.toFixed(2) + '%',
    isInTrendInRecent: true
  }
}
export function getKlineInfo(klines: I_continuous_klines[]) {
  if (!klines.length) {
    return
  }
  if(klines.length === 1) {
    return getKlineInfoSingleKline(klines)
  }
  let minIndex = 0
  let maxIndex = 0
  let type = ''
  let changePercent = 0
  let min = Math.min(klines[0].end_time_price, klines[0].start_time_price)
  let max = Math.max(klines[0].end_time_price, klines[0].start_time_price)
  klines.forEach((item, index) => {
    let minOne = Math.min(item.end_time_price, item.start_time_price)
    let maxOne = Math.max(item.end_time_price, item.start_time_price)
    if (minOne < min) {
      min = minOne
      minIndex = index
    }
    if (maxOne > max) {
      max = maxOne
      maxIndex = index
    }
  })
  // 下降
  if (minIndex > maxIndex) {
    changePercent = (max - min) / max
    type = 'down'
  }
  // 上涨
  if(minIndex < maxIndex) {
    changePercent = (max - min) / min
    type = 'up'
  }
  const changePercentStr = (changePercent * 100).toFixed(3) + '%'
  return {
    min,
    max,
    type,
    changePercentNumber: Number(changePercent.toFixed(4)),
    changePercentStr,
    isInTrendInRecent: getIsInTrendInRecent(klines, min, max, type),
    title: `浮动：${changePercentStr}% 趋势：${type} 最大值${max} 最小值${min}`
  } as IKlineInfo
}

function getIsInTrendInRecent(
  kline: I_continuous_klines[],
  min: number,
  max: number,
  type: string
) {
  const recentValue =
    (kline[kline.length - 1].end_time_price + kline[kline.length - 2].end_time_price) / 2
  if (type === 'up') {
    return recentValue > max * 0.994
  } else {
    return recentValue < min * 1.006
  }
}
