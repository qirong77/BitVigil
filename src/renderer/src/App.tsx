import { Tabs } from 'antd'
import { CoinTab } from './tabs/CoinTab'
import LogTab from './tabs/LogTab'
import { useState } from 'react'
import { NoteBook } from './tabs/Notebook'

export default function App() {
  const [activeTabKey, setActiveTabKey] = useState('Home')
  return (
    <div>
      <Tabs
        activeKey={activeTabKey}
        onChange={(activeKey) => setActiveTabKey(activeKey)}
        items={[
          { label: 'Home', key: 'Home', children: <CoinTab /> },
          {
            label: 'Log',
            key: 'Log',
            children: <LogTab isActiveTab={activeTabKey === 'Log'} />
          },
          {
            label: 'Note',
            key: 'Note',
            children: <NoteBook isActiveTab={activeTabKey === 'Note'} />
          }
        ]}
      />
    </div>
  )
}
