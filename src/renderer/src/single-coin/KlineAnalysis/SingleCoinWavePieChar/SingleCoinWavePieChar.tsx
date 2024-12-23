import { useEffect, useRef, useState } from 'react'
import { ELECTRON_EVENT } from '../../../../../common/electron-event'
import { I_continuous_klines } from '../../../../../common/types'
import * as echarts from 'echarts'
import { Spin } from 'antd'
import { getCoinAnalysisMap } from '../../../../../common/getCoinAnalysis'
const SIZE = 1000 * 5
const cacheMap = {}
export function SingleCoinWavePieChar({ coin, interval = 5 }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const echartsInstanceRef = useRef<echarts.ECharts>(null)
  const [isLoading, setIsLoading] = useState(false)
  const updateChar = (klines: I_continuous_klines[]) => {
    const map = getCoinAnalysisMap(klines)
    const days = (interval * klines.length) / (60 * 24)
    echartsInstanceRef.current?.dispose()
    const echartsInstance = echarts.init(containerRef.current!)
    echartsInstance.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          data: Object.keys(map).map((key) => {
            return {
              name: key,
              value: (map[key].items / days).toFixed(2)
            }
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  useEffect(() => {
    const key = `${coin}-${interval}`
    if (cacheMap[key]) {
      updateChar(cacheMap[key])
      return
    }
    setIsLoading(true)
    window.electron.ipcRenderer
      .invoke(ELECTRON_EVENT.GET_KLINE_ALL, coin, interval, SIZE)
      .then((res: I_continuous_klines[]) => {
        cacheMap[key] = res
        updateChar(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [coin, interval])
  return (
    <div style={{ width: '100%' }}>
      {isLoading && <Spin />}
      <div ref={containerRef} style={{ width: '100%', height: '300px' }}></div>
      <div></div>
    </div>
  )
}
