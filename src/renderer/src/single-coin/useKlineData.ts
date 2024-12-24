import { useCallback, useRef, useState } from 'react'
import { I_continuous_klines } from '../../../common/types'
import { ELECTRON_EVENT } from '../../../common/electron-event'
import { getKlineInfo } from '../../../common/kline/getKlineInfo'
// import { message } from 'antd'

export function useKlineData(coin: string) {
  const [klines, setKlines] = useState<I_continuous_klines[]>([])
  const [updateTime, setUpdateTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const lastUpdateTime = useRef(0)
  const update = useCallback((size = 600, immediate = true) => {
    if (!immediate && lastUpdateTime.current + 1000 * 60 * 3 > Date.now()) return
    setIsLoading(true)
    return window.electron.ipcRenderer
      .invoke(ELECTRON_EVENT.GET_KLINE_ALL, coin, 1, size)
      .then((res: I_continuous_klines[]) => {
        if (Array.isArray(res) && res.length) {
          res = res.sort((a, b) => a.end_time - b.end_time).slice(-size)
          setKlines(res)
          setUpdateTime(Date.now())
          lastUpdateTime.current = Date.now()
          return
        }
      })
      .finally(() => setIsLoading(false))
  }, [])
  return { klines, klineInfo: getKlineInfo(klines), updateTime, isLoading, update }
}
