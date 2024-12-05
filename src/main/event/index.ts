import { ipcMain } from 'electron'
import { ELECTRON_EVENT } from '../../common/electron-event'
import { fetchContinuousKlines } from '../fetch-binance/fetchContinuousKlines'

ipcMain.handle(
  ELECTRON_EVENT.GET_KLINE,
  (_e, coin, limit = 600, interval = 1, timeout = 1000 * 10) => {
    return fetchContinuousKlines(coin, limit, interval, timeout)
  }
)
