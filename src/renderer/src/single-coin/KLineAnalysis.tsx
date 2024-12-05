import { LineChartOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

export function KlineAlalysis() {
  return (
    <Popover>
      <LineChartOutlined style={{ cursor: 'pointer' }}/>
    </Popover>
  )
}
