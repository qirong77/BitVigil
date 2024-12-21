import { AYALYSIS_TIME } from '../../common/const'
import { getKlineInfo } from '../../common/kline/getKlineInfo'
import { supabase } from '../../common/supabase'
import { I_coin_alert_setting } from '../../common/supabase/tableCoinAlertSetting'
import { tableLog } from '../../common/supabase/tableLog'
import { isCoinOpenAlert } from '../notification'

const coinAlertSetting = new Map<string, I_coin_alert_setting>()
async function initCoinAlertSetting() {
  return supabase
    .from('coin_alert_setting')
    .select('*')
    .then((res) => {
      if (Array.isArray(res.data)) {
        res.data.forEach((item) => {
          coinAlertSetting.set(item.id, item)
        })
      }
    })
}

function logBigChangeFn(coin, klines, notifyFn) {
  if (!isCoinOpenAlert(coin)) return
  const alertSetting = coinAlertSetting.get(coin)
  if (!alertSetting) {
    return
  }
  let alertText = ''
  let level = 0
  AYALYSIS_TIME.forEach((time) => {
    const klineInfo = getKlineInfo(klines.slice(-time))
    const isOverThreshold = klineInfo!.changePercentNumber > alertSetting[time] / 100
    const isInTrend = klineInfo?.isInTrendInRecent
    if (isOverThreshold && isInTrend) {
      level += 1
      alertText += `${coin} - ${time}minute - ${klineInfo!.changePercentStr}\n`
    }
  })
  if (alertText) {
    notifyFn('Coin Alert - ' + coin, alertText, coin)
    const row = {
      id: new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + alertText,
      coin,
      level,
      content: alertText,
      time: Date.now(),
      validate: 0
    }
    tableLog.upsertLog(row)
  }
}

export const logBigChange = {
  initCoinAlertSetting,
  logBigChangeFn
}
