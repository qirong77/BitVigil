import { AlertFilled, FilterFilled, ReloadOutlined } from '@ant-design/icons'
import { LineChar } from './LineChar'
import { useKlineData } from './useKlineData'
import { useState } from 'react'
import { Popover, Radio, Spin } from 'antd'
import { KlineTimeFilter } from './KlineTimeFilter'
import { KlineAlalysis } from './KLineAnalysis'

export function SingleCoin({ coin }) {
  const klineData = useKlineData(coin)
  const [openAlert, setOpenAlert] = useState(false)
  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          fontSize: '16px',
          marginBottom: 10
        }}
      >
        <span>{coin}</span>
        <KlineTimeFilter updateKline={klineData.update} />
        <KlineAlalysis/>
        <AlertFilled
          onClick={() => setOpenAlert(!openAlert)}
          style={{ cursor: 'pointer', color: openAlert ? 'red' : '' }}
        />
        <ReloadOutlined onClick={() => klineData.update()} style={{ cursor: 'pointer' }} />
        <span>{new Date(klineData.updateTime).toLocaleString().slice(-8)}</span>
        {klineData.isLoading && <Spin />}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <LineChar klines={klineData.klines} klineInfo={klineData.klineInfo!} />
      </div>
    </div>
  )
}
