import { AlertFilled, ReloadOutlined } from '@ant-design/icons'
import { LineChar } from './LineChar'
import { useKlineData } from './useKlineData'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { KlineTimeFilter } from './KlineTimeFilter'
import { KlineAlalysis } from './KlineAnalysis/KLineAnalysis'
import { ELECTRON_EVENT } from '../../../common/electron-event'
import { CoinTabEmitter } from '../tabs/CoinTab'

export function SingleCoin({ coin, openAlertAll }) {
  const klineData = useKlineData(coin)
  const [openAlert, setOpenAlert] = useState(openAlertAll)
  useEffect(() => {
    window.electron.ipcRenderer.invoke(ELECTRON_EVENT.CHANGE_NOTIFICATION_STATUS, coin, openAlert)
  }, [openAlert])
  useEffect(() => {
    setOpenAlert(openAlertAll)
    const timer = setTimeout(() => {
      setOpenAlert(true)
    },1000 * 60 * 60)
    return () => clearTimeout(timer)
  }, [openAlertAll])
  useEffect(() => {
    const fn = () => klineData.update(600, false)
    CoinTabEmitter.on('refresh', fn)
    return () => CoinTabEmitter.off('refresh', fn)
  }, [klineData.update])
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
            setOpenAlert(!openAlert)
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
