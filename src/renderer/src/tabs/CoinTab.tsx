import { Button, Divider, Switch } from 'antd'
import { MAIN_COINS } from '../../../common/coins/MAIN_COINS'
import { SingleCoin } from '../single-coin'
import { useState } from 'react'
import { Emitter } from '../common/events'
import { ELECTRON_EVENT } from '../../../common/electron-event'
export const CoinTabEmitter = new Emitter()
export function CoinTab({ coins = MAIN_COINS }) {
  const [openAlert, setOpenAlert] = useState(true)
  return (
    <div>
      <Divider />
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ display: 'flex' }}>
          <Button onClick={() => setOpenAlert(true)}>开启提醒</Button>
        </span>
        <span style={{ display: 'flex' }}>
          <Button onClick={() => setOpenAlert(false)}>关闭提醒</Button>
        </span>
        <Button onClick={() => CoinTabEmitter.emit('refresh')}>刷新</Button>
        <Button
          onClick={() => {
            window.electron.ipcRenderer.invoke(ELECTRON_EVENT.NOTIFICATION, 'test', 'test')
          }}
        >
          提醒
        </Button>
      </div>
      <Divider />
      {coins.map((item) => (
        <SingleCoin openAlertAll={openAlert} key={item} coin={item} />
      ))}
    </div>
  )
}
