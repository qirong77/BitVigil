import { Tabs } from 'antd'
import { CoinTab } from './tabs/CoinTab'
import { useState } from 'react'
// import { NoteBook } from './tabs/Notebook'
import { CoinTabMeme } from './tabs/CoinTabMeme'
import LogTab from './tabs/LogTab'

export default function App() {
  const [activeTabKey, setActiveTabKey] = useState('Home')
  return (
    <div>
      <Tabs
        activeKey={activeTabKey}
        onChange={(activeKey) => setActiveTabKey(activeKey)}
        items={[
          { label: 'Home', key: 'Home', children: <CoinTab /> },
          { label: 'Meme', key: 'CoinTabMeme', children: <CoinTabMeme /> },
          { label: 'Log', key: 'Log', children: <LogTab isActiveTab={activeTabKey === 'Log'} /> },
          // {
          //   label: 'Note',
          //   key: 'Note',
          //   children: <NoteBook isActiveTab={activeTabKey === 'Note'} />
          // }
        ]}
      />
    </div>
  )
}
