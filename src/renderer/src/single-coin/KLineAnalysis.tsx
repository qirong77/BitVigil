import { LineChartOutlined } from '@ant-design/icons'
import { Popover, Radio } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { I_table_row_coin_wave, tableCoinWave } from '../../../common/supabase/tableCoinWave'
import { AYALYSIS_TIME } from '../../../common/const'

export function KlineAlalysis({ coin }) {
  return (
    <Popover
      destroyTooltipOnHide
      placement="right"
      content={
        <div style={{ width: '400px' }}>
          <SingleCoinWaveBarChar coin={coin} />
        </div>
      }
    >
      <LineChartOutlined style={{ cursor: 'pointer' }} />
    </Popover>
  )
}

function SingleCoinWaveBarChar({ coin }: { coin: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const echarInstance = useRef<echarts.ECharts>()
  const [coinWaveRows, setCoinWaveRows] = useState<I_table_row_coin_wave[]>([])
  const updateEChart = useCallback((time = 15, rows: I_table_row_coin_wave[]) => {
    const row = rows.find((row) => row.time_range === time)!
    if (!row) {
      return
    }
    const xLabel = Object.keys(row).filter((key) => key.startsWith('c_'))
    const yLabel = xLabel.map((item) => row[item])
    window.requestAnimationFrame(() => {
      echarInstance.current?.dispose()
      echarInstance.current = echarts.init(containerRef.current!)
      echarInstance.current.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '10%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xLabel,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            data: yLabel
          }
        ]
      })
    })
  }, [])
  useEffect(() => {
    tableCoinWave.getTableRowCoinWave(coin).then((res) => {
      console.log(res)
      setCoinWaveRows(res)
      updateEChart(15, res)
    })
  }, [])
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', alignItems: 'center' }}
    >
      <Radio.Group defaultValue={15} onChange={(e) => updateEChart(e.target.value, coinWaveRows)}>
        {AYALYSIS_TIME.map((item) => {
          return (
            <Radio key={item + ''} value={item}>
              {item}
            </Radio>
          )
        })}
      </Radio.Group>
      <div id="container" style={{ width: '100%', height: '300px' }} ref={containerRef} />
    </div>
  )
}
