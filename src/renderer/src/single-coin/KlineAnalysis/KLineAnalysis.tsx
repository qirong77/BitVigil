import { LineChartOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { SingleCoinWaveBarChar } from './SingleCoinWaveBarChar'
import { CoinWaveTable } from './CoinWaveTable'

export function KlineAlalysis({ coin }) {
  return (
    <Popover
      destroyTooltipOnHide
      placement="right"
      content={
        <div style={{ width: '400px' }}>
          <CoinWaveTable coin={coin}/>
          <SingleCoinWaveBarChar coin={coin} />
        </div>
      }
    >
      <LineChartOutlined style={{ cursor: 'pointer' }} />
    </Popover>
  )
}
