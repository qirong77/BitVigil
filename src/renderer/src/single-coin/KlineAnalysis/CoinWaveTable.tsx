import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { I_continuous_klines } from '../../../../common/types'
import { AYALYSIS_TIME } from '../../../../common/const'
import { ELECTRON_EVENT } from '../../../../common/electron-event'
import { getKlineInfo } from '../../../../common/kline/getKlineInfo'

export function CoinWaveTable({ coin }) {
  const [klines, setKlines] = useState<I_continuous_klines[]>([])
  useEffect(() => {
    window.electron.ipcRenderer.invoke(ELECTRON_EVENT.GET_KLINE, coin, 600, 1).then((res) => {
      setKlines(res)
    })
  }, [])
  if(!klines.length) return null
  return (
    <Table
      pagination={false}
      size="small"
      bordered
      rowKey={(record) => record[15]!}
      columns={AYALYSIS_TIME.map((time) => ({ title: time + 'min', dataIndex: time }))}
      dataSource={[
        {
          15: getKlineInfo(klines.slice(-15))?.changePercentStr,
          30: getKlineInfo(klines.slice(-30))?.changePercentStr,
          60: getKlineInfo(klines.slice(-60))?.changePercentStr,
          120: getKlineInfo(klines.slice(-120))?.changePercentStr,
          240: getKlineInfo(klines.slice(-240))?.changePercentStr
        }
      ]}
    />
  )
}
