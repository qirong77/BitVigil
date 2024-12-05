import { Tabs } from 'antd'
import { CoinTab } from './tabs/CoinTab'
import LogTab from './tabs/LogTab'

export default function App() {
  return (
    <div>
      <Tabs
        defaultActiveKey="Home"
        items={[
          { label: 'Home', key: 'Home', children: <CoinTab /> },
          {
            label: 'Log',
            key: 'Log',
            children: <LogTab />
          }
        ]}
      />
    </div>
  )
}
