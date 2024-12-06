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
        } else {
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
          left: '0%',
          right: '2%',
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
          min: klineInfo.min,
          max: klineInfo.max
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
