import { useCallback, useRef, useState } from 'react'
import { I_continuous_klines } from '../../../common/types'
import { ELECTRON_EVENT } from '../../../common/electron-event'
import { getKlineInfo } from '../../../common/kline/getKlineInfo'
import { message } from 'antd'

export function useKlineData(coin: string) {
  const [klines, setKlines] = useState<I_continuous_klines[]>([])
  const [updateTime, setUpdateTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const lastUpdateTime = useRef(0)
  const update = useCallback((limit = 600, interval = 1, immediate = true) => {
    if (!immediate && lastUpdateTime.current + 1000 * 60 * 3 > Date.now()) return
    setIsLoading(true)
    return window.electron.ipcRenderer
      .invoke(ELECTRON_EVENT.GET_KLINE, coin, limit, interval)
      .then((res) => {
        if (Array.isArray(res) && res.length) {
          setKlines(res)
          setUpdateTime(Date.now())
          lastUpdateTime.current = Date.now()
          return
        }
        // 失败的概率比较大，所以在 10 秒内重试
        setTimeout(() => update(limit, interval, immediate), 1000 * 10)
        message.error('获取k线数据失败')
        console.log(res)
      })
      .finally(() => setIsLoading(false))
  }, [])
  return { klines, klineInfo: getKlineInfo(klines), updateTime, isLoading, update }
}
