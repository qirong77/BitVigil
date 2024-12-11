import { useEffect, useState } from 'react'
import { ELECTRON_EVENT } from '../../../common/electron-event'
import { Button, Divider, Table } from 'antd'
import { tableLog } from '../../../common/supabase/tableLog'
interface I_log {
  id: string
  time: number
  title: string
  content?: string
}
export default function LogTab({ isActiveTab }: { isActiveTab: boolean }) {
  const [mainLogs, setMainLogs] = useState<I_log[]>([])
  const [changeLogs, setChangeLogs] = useState<I_log[]>([])
  const update = () => {
    window.electron.ipcRenderer.invoke(ELECTRON_EVENT.ELECTRON_LOG).then((value) => {
      setMainLogs(value)
    })
    tableLog.getLog().then((res) => {
      setChangeLogs(res.data!)
    })
  }
  useEffect(() => {
    isActiveTab && update()
  }, [isActiveTab])
  return (
    <div>
      <Divider />
      <Button
        onClick={() => {
          tableLog.clearLog().then((res) => {
            if (res.status === 204) {
              update()
            }
          })
        }}
      >
        清除日志
      </Button>
      <Divider />
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
        dataSource={changeLogs}
      />
      <Divider />

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
