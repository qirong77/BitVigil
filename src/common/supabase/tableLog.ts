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
