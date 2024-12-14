import { useEffect, useRef } from 'react'
import { I_continuous_klines } from '../../../common/types'
import * as echarts from 'echarts'
import { getShowDate } from '../common/getShowDate'
import { IKlineInfo } from '../../../common/kline/getKlineInfo'

export function LineChar({
  klines,
  klineInfo,
  updateKlineMethod
}: {
  klines: I_continuous_klines[]
  klineInfo: IKlineInfo
  updateKlineMethod: (limit?: number, interval?: number, immediate?: boolean) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const echartInstance = useRef<echarts.ECharts>(null)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateKlineMethod(600, 1, false)
        }
      })
    })
    observer.observe(containerRef.current!)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (!klines?.length || !klineInfo) return
      echartInstance.current?.dispose()
      // @ts-ignore
      echartInstance.current = echarts.init(containerRef.current)
      echartInstance.current.setOption({
        animation: false,
        grid: {
          top: '3%',
          left: '3%',
          right: '3%',
          bottom: '0%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            margin: 20
          },
          axisTick: {
            alignWithLabel: true
          },
          data: klines.map((item) => getShowDate(item.time))
        },
        yAxis: {
          type: 'value',
          name: 'KLines',
          splitLine: {
            show: false
          },
          min: prettierNumber(klineInfo.min * 0.988),
          max: prettierNumber(klineInfo.max * 1.012)
        },
        series: [
          {
            data: klines.map((item) => item.end_time_price),
            type: 'line',
            showSymbol: false,

            lineStyle: {
              width: 1.8
            }
          }
        ]
      })
    }, 250)
  }, [klines])
  return <div style={{ width: '100%', height: '250px' }} ref={containerRef}></div>
}

function prettierNumber(n: number) {
  if(n > 100) {
    return n.toFixed(0)
  }
  if(n > 100) {
    return n.toFixed(1)
  }
  if(n > 1) {
    return n.toFixed(2)
  }
  if(n > 0.1) {
    return n.toFixed(3)
  }
  if(n > 0.01) {
    return n.toFixed(4)
  }
  if(n > 0.001) {
    return n.toFixed(5)
  }
  if(n > 0.0001) {
    return n.toFixed(6)
  }
  return n
}
