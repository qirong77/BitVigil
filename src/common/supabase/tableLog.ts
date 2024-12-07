import { getKlineInfo } from '../kline/getKlineInfo'
import { supabase } from './index'
export interface I_log {
  id: string
  time: number
  title: string
  content?: string
}
export function supabaseTableLog(title: string, content = '') {
  return supabase
    .from('log')
    .insert({ time: Date.now(), title, content })
    .then((res) => {
      if (res.status !== 201) {
        console.log('supabaseTableLog-ERROR', res)
      }
    })
}

export function logBigChange(coin, klines) {
  const changePercent15 = getKlineInfo(klines.slice(-15))?.changePercentNumber
  const chaneOf30 = getKlineInfo(klines.slice(-30))?.changePercentNumber
  const changeOf60 = getKlineInfo(klines.slice(-60))?.changePercentNumber
  if (changePercent15 && changePercent15 > 0.01) {
    const log = coin + '_15_' + (changePercent15 * 100).toFixed(2) + '%'
    supabaseTableLog(log)
  }
  if (chaneOf30 && chaneOf30 > 0.018) {
    const log = coin + '_30_' + (chaneOf30 * 100).toFixed(2) + '%'
    supabaseTableLog(log)
  }
  if (changeOf60 && changeOf60 > 0.025) {
    const log = coin + '_60_' + (changeOf60 * 100).toFixed(2) + '%'
    supabaseTableLog(log)
  }
}
