import { AlertFilled, FilterFilled, ReloadOutlined } from '@ant-design/icons'
import { LineChar } from './LineChar'
import { useKlineData } from './useKlineData'
import { useState } from 'react'
import { Spin } from 'antd'
import { KlineTimeFilter } from './KlineTimeFilter'
import { KlineAlalysis } from './KlineAnalysis/KLineAnalysis'
import { ELECTRON_EVENT } from '../../../common/electron-event'

export function SingleCoin({ coin }) {
  const klineData = useKlineData(coin)
  const [openAlert, setOpenAlert] = useState(true)
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
        <KlineAlalysis coin={coin} />
        <AlertFilled
          onClick={() => {
            window.electron.ipcRenderer
              .invoke(ELECTRON_EVENT.CHANGE_NOTIFICATION_STATUS, coin, !openAlert)
              .then((res) => {
                res && setOpenAlert(!openAlert)
              })
          }}
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
        <LineChar
          updateKlineMethod={klineData.update}
          klines={klineData.klines}
          klineInfo={klineData.klineInfo!}
        />
      </div>
    </div>
  )
}
