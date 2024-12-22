import { useCallback, useEffect, useRef, useState } from 'react'
import { I_table_row_coin_wave, tableCoinWave } from '../../../../common/supabase/tableCoinWave'
import * as echarts from 'echarts'
import { Radio } from 'antd'
import { AYALYSIS_TIME } from '../../../../common/const'
import { ELECTRON_EVENT } from '../../../../common/electron-event'
import { I_continuous_klines } from '../../../../common/types'
import { getKlineInfo, IKlineInfo } from '../../../../common/kline/getKlineInfo'
import { getTicks } from './getTicks'

export function SingleCoinWaveBarChar({ coin }: { coin: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const echarInstance = useRef<echarts.ECharts>()
  const [coinWaveRows, setCoinWaveRows] = useState<I_table_row_coin_wave[]>([])
  const updateEChart = useCallback((time = 15, rows: I_table_row_coin_wave[]) => {
    const row = rows.find((row) => row.time_range === time)!
    if (!row || !containerRef.current) {
      return
    }
    const xLabel = Object.keys(row).filter((key) => key.startsWith('c_'))
    const yLabel = xLabel.map((item) => row[item])
    setTimeout(() => {
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
    }, 100)
  }, [])
  useEffect(() => {
    tableCoinWave.getTableRowCoinWave(coin).then((res) => {
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
      <PieChar coin={coin} />
    </div>
  )
}

function PieChar({ coin }) {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const interval = 5
    const size = 3
    window.electron.ipcRenderer
      .invoke(ELECTRON_EVENT.GET_KLINE_ALL, coin, 5, 3)
      .then((res: I_continuous_klines[]) => {
        const changeInfos = res
          .map((kline) => {
            return getKlineInfo([kline])!
          })
          .sort((a, b) => {
            return b!.changePercentNumber - a!.changePercentNumber
          })
        const days = (5 * 3 * 1000) / (60 * 24)
        const map = getMap(changeInfos)
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
              })
            }
          ]
        })
      })
  }, [])
  return <div ref={containerRef} style={{ width: '100%', height: '300px' }}></div>
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
