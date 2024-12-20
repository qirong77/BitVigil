import { ipcMain } from 'electron'
import { ELECTRON_EVENT } from '../../common/electron-event'
import { fetchContinuousKlines } from '../fetch-binance/fetchContinuousKlines'
import { electronLog } from '../electron-log'
import { chaneCoinAlertStatus, notifyCommon } from '../notification'

ipcMain.handle(
  ELECTRON_EVENT.GET_KLINE,
  (_e, coin, limit = 600, interval = 1, timeout = 1000 * 10) => {
    return fetchContinuousKlines(coin, limit, interval, timeout)
  }
)

ipcMain.handle(ELECTRON_EVENT.ELECTRON_LOG, (_e) => {
  return electronLog.getLogs()
})
ipcMain.handle(ELECTRON_EVENT.CHANGE_NOTIFICATION_STATUS, (_e, coin, status) => {
  return chaneCoinAlertStatus(coin, status)
})
ipcMain.handle(ELECTRON_EVENT.NOTIFICATION, (_e, title, body) => {
  return notifyCommon(title, body)
})
