import { ipcMain } from 'electron'
import { ELECTRON_EVENT } from '../../common/electron-event'
import { electronLog } from '../electron-log'
import { fetchContinuousKlinesAllBySize } from '../fetch-binance/fetchContinuousKlinesAll'
import { Notification } from 'electron'
ipcMain.handle(ELECTRON_EVENT.ELECTRON_LOG, (_e) => {
  return electronLog.getLogs()
})
ipcMain.handle(ELECTRON_EVENT.NOTIFICATION, (_e, title, body) => {
  const nf = new Notification({
    title,
    body
  })
  nf.show()
})

ipcMain.handle(ELECTRON_EVENT.GET_KLINE_ALL, async (_e, coin, interval, size) => {
  const result = await fetchContinuousKlinesAllBySize(coin, interval, size)
  return result
})
