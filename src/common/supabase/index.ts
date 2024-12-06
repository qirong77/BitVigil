import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://sjrvkvzdaxqthxvsbnda.supabase.co'
const SUPABASE_KEY = {
  // 需要设置正确的Row Level Security，一般用来查询数据
  PUBLIC:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcnZrdnpkYXhxdGh4dnNibmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMzQ5ODAsImV4cCI6MjA0ODgxMDk4MH0.6zn03mhI98DFY4p09GKuxVZTATeEyF2N8yNs8PI43aE',
  // 绕过 Row Level Security
  SERVICE: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcnZrdnpkYXhxdGh4dnNibmRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzIzNDk4MCwiZXhwIjoyMDQ4ODEwOTgwfQ.xcsO-HJ1A8xyJTsjxE1EAT99MtjfwfgThIG1Lbx1KZg'
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY.SERVICE)

