import { useEffect, useState } from 'react'
import { ELECTRON_EVENT } from '../../../common/electron-event'
import { Table } from 'antd'
interface I_log {
  id: string
  time: number
  title: string
  content?: string
}
export default function LogTab({ isActiveTab }: { isActiveTab: boolean }) {
  const [mainLogs, setMainLogs] = useState<I_log[]>([])
  useEffect(() => {
    isActiveTab &&
      window.electron.ipcRenderer.invoke(ELECTRON_EVENT.ELECTRON_LOG).then((value) => {
        setMainLogs(value)
      })
  }, [isActiveTab])
  return (
    <div>
      <Table
        bordered
        size="small"
        rowKey={(record) => record.id}
        columns={[
          {
            title: '时间',
            dataIndex: 'time',
            render(value, record, index) {
              return new Date(value).toLocaleString()
            }
          },
          { title: '标题', dataIndex: 'title' },
          { title: '内容', dataIndex: 'content' }
        ]}
        dataSource={mainLogs}
      />
    </div>
  )
}
