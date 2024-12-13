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
  const [isLoading, setIsLoading] = useState(false)
  const update = () => {
    setIsLoading(true)
    window.electron.ipcRenderer.invoke(ELECTRON_EVENT.ELECTRON_LOG).then((value) => {
      setMainLogs(value)
    })
    tableLog.getLog().then((res) => {
      setChangeLogs(res.data!.filter((item) => item.title.startsWith('deviceM1pro：')))
      setIsLoading(false)
    })
  }
  useEffect(() => {
    isActiveTab && update()
  }, [isActiveTab])
  return (
    <div>
      <Divider />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
        loading={isLoading}
          onClick={() => {
            setIsLoading(true)
            tableLog.clearLog().then((res) => {
              if (res.status === 204) {
                update()
                setIsLoading(false)
              }
            })
          }}
        >
          清除日志
        </Button>
        <Button
          loading={isLoading}
          onClick={() => {
            update()
          }}
        >
          刷新
        </Button>
      </div>
      <Divider />
      <Table
        loading={isLoading}
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
