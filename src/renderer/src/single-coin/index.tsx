import { AlertFilled, ReloadOutlined } from '@ant-design/icons'
import { LineChar } from './LineChar'
import { useKlineData } from './useKlineData'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { KlineTimeFilter } from './KlineTimeFilter'
import { KlineAlalysis } from './KlineAnalysis/KLineAnalysis'
import { CoinTabEmitter } from '../tabs/CoinTab'
import { tableCoinAlertSetting } from '../../../common/supabase/tableCoinAlertSetting'

export function SingleCoin({ coin }) {
  const klineData = useKlineData(coin)
  const [openAlert, setOpenAlert] = useState(true)
  useEffect(() => {
    tableCoinAlertSetting.changeAlert(coin, openAlert)
    const timer = setTimeout(
      () => {
        setOpenAlert(true)
      },
      1000 * 60 * 60
    )
    return () => clearTimeout(timer)
  }, [openAlert])
  useEffect(() => {
    const fn = () => klineData.update(600, false)
    CoinTabEmitter.on('refresh', fn)
    return () => CoinTabEmitter.off('refresh', fn)
  }, [klineData.update])
  useEffect(() => {
    const fn = (value) => {
      setOpenAlert(value)
    }
    CoinTabEmitter.on('changeAlert', fn)
    return () => CoinTabEmitter.off('changeAlert', fn)
  }, [coin])
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
