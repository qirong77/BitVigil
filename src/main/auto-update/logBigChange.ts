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
  AYALYSIS_TIME.forEach((time) => {
    const klineInfo = getKlineInfo(klines.slice(-time))
    if (klineInfo!.changePercentNumber > alertSetting[time] / 100) {
      const log = coin + '_' + time + '_' + klineInfo?.changePercentStr
      notifyFn('Warning', log, coin)
      tableLog.addLog(log)
    }
  })
}

export const logBigChange = {
  initCoinAlertSetting,
  logBigChangeFn
}
