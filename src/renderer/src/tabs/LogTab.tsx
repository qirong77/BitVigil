import { useEffect, useState } from 'react'
import { ELECTRON_EVENT } from '../../../common/electron-event'
import { Button, Divider, message, Select, Table } from 'antd'
import { I_log, tableLog } from '../../../common/supabase/tableLog'
import { MAIN_COINS } from '../../../common/coins/MAIN_COINS'
interface I_log_main {
  id: string
  time: number
  title: string
  content?: string
}
export default function LogTab({ isActiveTab }: { isActiveTab: boolean }) {
  const [mainLogs, setMainLogs] = useState<I_log_main[]>([])
  const [changeLogs, setChangeLogs] = useState<I_log[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectCoins, setSelectCoins] = useState<string[]>([])
  const update = () => {
    setIsLoading(true)
    window.electron.ipcRenderer.invoke(ELECTRON_EVENT.ELECTRON_LOG).then((value) => {
      setMainLogs(value)
    })
    tableLog.getLog().then((res) => {
      setChangeLogs(res.data!)
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
        <Select
          allowClear
          style={{ width: 240 }}
          maxTagCount={2}
          mode="multiple"
          value={selectCoins}
          onChange={setSelectCoins}
          options={MAIN_COINS.map((item) => ({ label: item, value: item }))}
        />
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
            width: 150,
            render(value, record, index) {
              return new Date(value).toLocaleString()
            }
          },
          { title: 'coin', dataIndex: 'coin', width: 150 },
          { title: 'level', dataIndex: 'level' },
          {
            title: '内容',
            dataIndex: 'content',
            render(value, record, index) {
              return <div style={{ color: record.validate ? 'red' : 'inherit' }}>{value}</div>
            }
          },
          {
            title: '操作',
            render(value, record, index) {
              return (
                <>
                  <Button
                    type="link"
                    onClick={() => {
                      const newRow = { ...record, validate: record.validate ? 0 : 1 }
                      tableLog.updateLog(newRow).then((res) => {
                        if(res.status === 204) {
                          update()
                        } else {
                          message.error('更新失败')
                        }
                      })
                    }}
                  >
                    {record.validate ? '标记为无效' : '标记为有效'}{' '}
                  </Button>
                </>
              )
            }
          }
        ]}
        dataSource={changeLogs.filter((item) => {
          if (!selectCoins.length) return true
          return selectCoins.find((coin) => item.coin === coin)
        })}
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
