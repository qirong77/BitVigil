import { useEffect, useState } from 'react'
import { ELECTRON_EVENT } from '../../../common/electron-event'
import { Button, Checkbox, DatePicker, Divider, message, Select, Table } from 'antd'
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
  const [filterCodition, setfilterCodition] = useState({
    selectCoins: [] as string[],
    onlyshowValid: false,
    onlyshowInvalid: false,
    startTime: 0,
    endTime: 0,
    levels: [] as number[]
  })
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
  const getFinalShowChangeLogs = () => {
    return (
      changeLogs?.filter((item) => {
        if (filterCodition.selectCoins.length && !filterCodition.selectCoins.includes(item.coin))
          return false
        if (filterCodition.startTime && filterCodition.endTime) {
          console.log('----')
          console.log(new Date(item.time).toLocaleString())
          console.log(new Date(filterCodition.startTime).toLocaleString())
          console.log(new Date(filterCodition.endTime).toLocaleString())
          console.log('----')
          if (item.time < filterCodition.startTime || item.time > filterCodition.endTime) {
            return false
          }
        }
        if (filterCodition.levels.length) {
          if (!filterCodition.levels.includes(item.level)) {
            return false
          }
        }
        if (filterCodition.onlyshowValid) {
          return item.validate === 1
        }
        if (filterCodition.onlyshowInvalid) {
          return item.validate === 0
        }
        return true
      }) || []
    )
  }
  useEffect(() => {
    isActiveTab && update()
  }, [isActiveTab])
  return (
    <div>
      <Divider />
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
          placeholder="选择币种"
          allowClear
          style={{ width: 240 }}
          maxTagCount={2}
          mode="multiple"
          value={filterCodition.selectCoins}
          onChange={(selectCoins) => {
            setfilterCodition({
              ...filterCodition,
              selectCoins
            })
          }}
          options={MAIN_COINS.map((item) => ({ label: item, value: item }))}
        />
        <Select
          placeholder="选择level"
          allowClear
          style={{ width: 240 }}
          maxTagCount={2}
          mode="multiple"
          value={filterCodition.levels}
          options={[1, 2, 3, 4, 5, 6].map((item) => ({ label: item, value: item }))}
          onChange={(levels) => {
            setfilterCodition({
              ...filterCodition,
              levels
            })
          }}
        />
        <DatePicker.RangePicker
          onChange={(v) => {
            setfilterCodition({
              ...filterCodition,
              // @ts-ignore
              startTime: v[0].valueOf(),
              // @ts-ignore
              endTime: v[1].valueOf()
            })
          }}
        ></DatePicker.RangePicker>
        <Checkbox
          checked={filterCodition.onlyshowValid}
          onChange={(e) =>
            setfilterCodition({ ...filterCodition, onlyshowValid: e.target.checked })
          }
        >
          标记为有效
        </Checkbox>
        <Checkbox
          checked={filterCodition.onlyshowInvalid}
          onChange={(e) =>
            setfilterCodition({ ...filterCodition, onlyshowInvalid: e.target.checked })
          }
        >
          标记为无效
        </Checkbox>
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
          { title: 'coin', dataIndex: 'coin', align: 'center', width: 100 },
          { title: 'level', dataIndex: 'level', align: 'center', width: 100 },
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
                <div style={{ display: 'flex' }}>
                  <Button
                    type="link"
                    onClick={() => {
                      const newRow = { ...record, validate: record.validate ? 0 : 1 }
                      tableLog.updateLog(newRow).then((res) => {
                        if (res.status === 204) {
                          update()
                        } else {
                          message.error('更新失败')
                        }
                      })
                    }}
                  >
                    {record.validate ? '标记为无效' : '标记为有效'}{' '}
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      tableLog.deleteLog(record).then((res) => {
                        if (res.status === 204) {
                          update()
                        } else {
                          message.error('删除失败')
                        }
                      })
                    }}
                  >
                    删除
                  </Button>
                </div>
              )
            }
          }
        ]}
        dataSource={getFinalShowChangeLogs()}
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
