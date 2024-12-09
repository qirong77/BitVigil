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
      return res
    })
}

export function getLog() {
  return supabase.from('log').select('*').order('time', { ascending: false })
}

export const tableLog = {
  getLog
}
// 谨慎修改～！
export function logBigChange(coin, klines, notifyFn) {
  const changePercent15 = getKlineInfo(klines.slice(-15))!.changePercentNumber
  const changePercent30 = getKlineInfo(klines.slice(-30))!.changePercentNumber
  const changePercent60 = getKlineInfo(klines.slice(-60))!.changePercentNumber
  if (changePercent15 > 0.016) {
    const log = coin + '_15_' + (changePercent15 * 100).toFixed(2) + '%'
    notifyFn('Warning', log, coin)
    supabaseTableLog(log)
  }
  if (changePercent15 > 0.012 && changePercent30 > 0.024) {
    const log = coin + '_30_' + (changePercent30 * 100).toFixed(2) + '%'
    notifyFn('Warning', log, coin)
    supabaseTableLog(log)
  }
  if (changePercent15 > 0.01 && changePercent60 > 0.03) {
    const log = coin + '_60_' + (changePercent60 * 100).toFixed(2) + '%'
    notifyFn('Warning', log, coin)
    supabaseTableLog(log)
  }
}
