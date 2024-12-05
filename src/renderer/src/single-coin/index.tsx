import { AlertFilled, FilterFilled, ReloadOutlined } from '@ant-design/icons'
import { LineChar } from './LineChar'
import { useKlineData } from './useKlineData'
import { useState } from 'react'
import { Popover, Radio, Spin } from 'antd'
import { KlineTimeFilter } from './KlineTimeFilter'

export function SingleCoin({ coin }) {
  const klineData = useKlineData(coin)
  const [openAlert, setOpenAlert] = useState(false)
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '16px',margin: '20px 0 10px 0' }}>
        <span>{coin}</span>
        <KlineTimeFilter updateKline={klineData.update} />
        <AlertFilled
          onClick={() => setOpenAlert(!openAlert)}
          style={{ cursor: 'pointer', color: openAlert ? 'red' : '' }}
        />
        <ReloadOutlined onClick={() => klineData.update()} style={{ cursor: 'pointer' }} />
        <span>{new Date(klineData.updateTime).toLocaleString().slice(-8)}</span>
        {klineData.isLoading && <Spin />}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <LineChar klines={klineData.klines} klineInfo={klineData.klineInfo!} />
      </div>
    </div>
  )
}
