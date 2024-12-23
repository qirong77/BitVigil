import { useEffect, useRef, useState } from 'react'
import { ELECTRON_EVENT } from '../../../../../common/electron-event'
import { I_continuous_klines } from '../../../../../common/types'
import { getKlineInfo, IKlineInfo } from '../../../../../common/kline/getKlineInfo'
import * as echarts from 'echarts'
import { getTicks } from './getTicks'
import { Spin } from 'antd'
const SIZE = 1000 * 5
const cacheMap = {}
export function SingleCoinWavePieChar({ coin, interval = 5 }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const echartsInstanceRef = useRef<echarts.ECharts>(null)
  const [isLoading, setIsLoading] = useState(false)
  const updateChar = (klines: I_continuous_klines[]) => {
    const changeInfos = klines
      .map((kline) => {
        return getKlineInfo([kline])!
      })
      .sort((a, b) => {
        return b!.changePercentNumber - a!.changePercentNumber
      })
    const days = (interval * klines.length) / (60 * 24)
    const map = getMap(changeInfos)
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
              value: (map[key].items.length / days).toFixed(2)
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

function addValue(value, o, item) {
  for (const part of Object.values(o)) {
    // @ts-ignore
    const section = part.section
    if (value >= section[0] && value <= section[1]) {
      // @ts-ignore
      part.items.push(item)
      return
    }
  }
}

function getMap(changeInfos: IKlineInfo[]) {
  const p10Index = Math.floor(changeInfos.length * 0.1)
  const min = changeInfos[p10Index].changePercentNumber * 100
  const max = changeInfos[0].changePercentNumber * 100
  const ticks = getTicks(min, max, 8)
  const o = {}
  for (let i = 0; i < ticks.length - 1; i++) {
    const tick = ticks[i]
    const nextTick = ticks[i + 1]
    o[tick + '% - ' + nextTick + '%'] = {
      section: [tick, nextTick],
      items: []
    }
  }
  changeInfos.slice(0, p10Index).forEach((changeInfo) => {
    addValue(changeInfo.changePercentNumber * 100, o, changeInfo)
  })
  return o
}
