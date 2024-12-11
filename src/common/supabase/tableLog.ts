import { supabase } from './index'
export interface I_log {
  id: string
  time: number
  title: string
  content?: string
}
export function addLog(title: string, content = '') {
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
export function clearLog() {
  return supabase.from('log').delete().gt('time', 0)
}
export const tableLog = {
  getLog,
  addLog,
  clearLog
}
