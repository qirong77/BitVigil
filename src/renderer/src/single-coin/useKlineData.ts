import { useEffect, useState } from 'react'
import { I_continuous_klines } from '../../../common/types'
import { ELECTRON_EVENT } from '../../../common/electron-event'
import { getKlineInfo } from '../../../common/kline/getKlineInfo'
import { message } from 'antd'

export function useKlineData(coin: string) {
  const [klines, setKlines] = useState<I_continuous_klines[]>([])
  const [updateTime, setUpdateTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const update = (limit = 600, interval = 1) => {
    setIsLoading(true)
    return window.electron.ipcRenderer
      .invoke(ELECTRON_EVENT.GET_KLINE, coin, limit, interval)
      .then((res) => {
        if (Array.isArray(res) && res.length) {
          setKlines(res)
          setUpdateTime(Date.now())
          return
        }
        console.log(res)
        message.error('获取k线数据失败')
        throw new Error('获取k线数据失败')
      })
      .finally(() => setIsLoading(false))
  }
  useEffect(() => {
    update()
  }, [])
  return { klines, klineInfo: getKlineInfo(klines), updateTime, isLoading, update }
}
