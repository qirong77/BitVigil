import { supabase } from './index'
export interface I_log {
  id: string
  time: number
  coin: string
  level: number
  content: string
  validate: number
}
export function addLog(coin: string, alertLevel = 1, content = '') {
  return supabase
    .from('log')
    .insert({ time: Date.now(), coin, level: alertLevel, content, validate: 0 })
    .then((res) => {
      if (res.status !== 201) {
        console.log('supabaseTableLog-ERROR', res)
      }
      return res
    })
}
export function upsertLog(row: I_log) {
  return supabase.from('log').upsert(row).then((res) => {
    if(res.error) {
      console.log('出错：')
      console.log(res.error)
    }
  })
}
export function getLog() {
  return supabase.from('log').select('*').order('time', { ascending: false })
}
export function clearLog() {
  return supabase.from('log').delete().eq('validate', 0)
}
export function updateLog(row: I_log) {
  return supabase.from('log').update(row).eq('id', row.id)
}
export function deleteLog(row: I_log) {
  return supabase.from('log').delete().eq('id', row.id)
}
export const tableLog = {
  getLog,
  addLog,
  clearLog,
  updateLog,
  deleteLog,
  upsertLog
}
