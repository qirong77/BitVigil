import { useEffect, useRef  } from 'react'
import * as echarts from 'echarts'
import coinKlinesStatistic from '../../../../../common/coin-klines-statistic/index.json'
export function SingleCoinWavePieChar({ coin, interval = 5 }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const echartsInstanceRef = useRef<echarts.ECharts>(null)
  const updateChar = (map,days) => {
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
    const key = `${coin}_${interval}m`
    const data = coinKlinesStatistic[key]
    const days = data.size * interval / 60 / 24
    updateChar(data.map,days)
  }, [coin, interval])
  return (
    <div style={{ width: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '300px' }}></div>
      <div></div>
    </div>
  )
}
