import { LineChartOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { SingleCoinWaveBarChar } from './SingleCoinWaveBarChar'
import { CoinWaveTable } from './CoinWaveTable'
import { CoinWaveAlertSettingTable } from './CoinWaveAlertSettingTable'

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
          <SingleCoinWaveBarChar coin={coin} />
        </div>
      }
    >
      <LineChartOutlined style={{ cursor: 'pointer' }} />
    </Popover>
  )
}
