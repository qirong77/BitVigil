import { LineChartOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

import { CoinWaveTable } from './CoinWaveTable'
import { CoinWaveAlertSettingTable } from './CoinWaveAlertSettingTable'
import { SingleCoinWaveChar } from './SingleCoinWaveChar'
import { PriceAlert } from './PriceAlert'

export function KlineAlalysis({ coin }) {
  return (
    <Popover
      destroyTooltipOnHide
      placement='topRight'
      trigger={'click'}
      content={
        <div style={{ width: '800px',height:'300px',overflow:'scroll' }}>
          <PriceAlert coin={coin} />
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
