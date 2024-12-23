import { LineChartOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

import { CoinWaveTable } from './CoinWaveTable'
import { CoinWaveAlertSettingTable } from './CoinWaveAlertSettingTable'
import { SingleCoinWaveChar } from './SingleCoinWaveChar'

export function KlineAlalysis({ coin }) {
  return (
    <Popover
      destroyTooltipOnHide
      placement="right"
      trigger={'click'}
      content={
        <div style={{ width: '800px' }}>
          <CoinWaveTable coin={coin}/>
          <CoinWaveAlertSettingTable coin={coin}/>
          <SingleCoinWaveChar coin={coin} />
        </div>
      }
    >
      <LineChartOutlined style={{ cursor: 'pointer' }} />
    </Popover>
  )
}
