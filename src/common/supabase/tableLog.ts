import { getKlineInfo } from '../kline/getKlineInfo'
import { supabase } from './index'
export interface I_log {
  id: string
  time: number
  title: string
  content?: string
}
export function supabaseTableLog(title: string, content = '') {
  return supabase.from('log').insert({ time: Date.now(), title, content })
}

export function logBigChange(coin, klines) {
  const changePercent15 = getKlineInfo(klines.slice(-15))?.changePercentNumber
  const chaneOf30 = getKlineInfo(klines.slice(-30))?.changePercentNumber
  const changeOf60 = getKlineInfo(klines.slice(-60))?.changePercentNumber
  if(changePercent15 && changePercent15 > 0.015 ) {
    supabaseTableLog(`大幅度涨跌 ${coin} ${changePercent15} ${chaneOf30} ${changeOf60}`)
  }
  if(chaneOf30 && chaneOf30 > 0.02 ) {
    supabaseTableLog(`大幅度涨跌 ${coin} ${changePercent15} ${chaneOf30} ${changeOf60}`)
  }
  if(changeOf60 && changeOf60 > 0.03 ) {
    supabaseTableLog(`大幅度涨跌 ${coin} ${changePercent15} ${chaneOf30} ${changeOf60}`)
  }
}
