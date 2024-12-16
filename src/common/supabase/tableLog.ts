import { supabase } from './index'
export interface I_log {
  id: string
  time: number
  coin: string
  level: number
  content: string
}
export function addLog(coin: string, alertLevel = 1, content = '') {
  return supabase
    .from('log')
    .insert({ time: Date.now(), coin, level: alertLevel, content })
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
export function clearLog() {
  return supabase.from('log').delete().gt('time', 0)
}
export const tableLog = {
  getLog,
  addLog,
  clearLog
}
