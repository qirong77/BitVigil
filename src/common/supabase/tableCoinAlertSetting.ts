import { supabase } from '.'

const TABLE_NAME = 'coin_alert_setting'
export interface I_coin_alert_setting {
  id: string
  15: number
  30: number
  60: number
  120: number
  240: number
  360: number
  480: number
  600: number
}
function getCoinAlertSetting(coin: string) {
  return new Promise<I_coin_alert_setting>((resolve, reject) => {
    supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', coin)
      .then((res) => {
        if (res.error) {
          reject(res.error)
          return
        }
        if (Array.isArray(res.data) && res.data.length) {
          resolve(res.data[0])
          return
        }
        const newRow = {
          id: coin,
          15: 0,
          30: 0,
          60: 0,
          120: 0,
          240: 0,
          360: 0,
          480: 0,
          600: 0
        }
        supabase
          .from(TABLE_NAME)
          .insert(newRow)
          .then((res) => {
            if (res.error) {
              reject(res.error)
              return
            }
            resolve(newRow)
          })
      })
  })
}

function setCoinAlertSetting(coin: string, data: I_coin_alert_setting) {
  return supabase.from(TABLE_NAME).update(data).eq('id', coin)
}

export const tableCoinAlertSetting = {
  getCoinAlertSetting,
  setCoinAlertSetting
}
