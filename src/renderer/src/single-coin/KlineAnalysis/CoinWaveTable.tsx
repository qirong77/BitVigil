import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { I_continuous_klines } from '../../../../common/types'
import { ANALYSIS_TIME } from '../../../../common/const'
import { ELECTRON_EVENT } from '../../../../common/electron-event'
import { getKlineInfo } from '../../../../common/kline/getKlineInfo'

export function CoinWaveTable({ coin }) {
  const [klines, setKlines] = useState<I_continuous_klines[]>([])
  useEffect(() => {
    window.electron.ipcRenderer.invoke(ELECTRON_EVENT.GET_KLINE_ALL, coin, 1, 600).then((res) => {
      setKlines(res)
    })
  }, [])
  if (!klines.length) return null
  const tableRow = {}
  ANALYSIS_TIME.forEach((time) => {
    tableRow[time] = getKlineInfo(klines.slice(-time))?.changePercentStr
  })
  return (
    <Table
      pagination={false}
      size="small"
      bordered
      rowKey={(record) => {
        return Object.values(record).join('-')
      }}
      columns={ANALYSIS_TIME.map((time) => ({ title: time + 'min', dataIndex: time,key: time }))}
      dataSource={[tableRow]}
    />
  )
}
