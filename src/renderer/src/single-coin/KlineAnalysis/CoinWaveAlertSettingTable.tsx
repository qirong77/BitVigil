import { InputNumber, message, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { ANALYSIS_TIME } from '../../../../common/const'
import {
  I_coin_alert_setting,
  tableCoinAlertSetting
} from '../../../../common/supabase/tableCoinAlertSetting'

export function CoinWaveAlertSettingTable({ coin }) {
  const [row, setRow] = useState<I_coin_alert_setting>()
  const [isLoading, setIsLoading] = useState(false)
  const newChangeValueRef = useRef<number>()
  useEffect(() => {
    tableCoinAlertSetting.getCoinAlertSetting(coin).then((res) => {
      setRow(res)
    })
  }, [])
  if (!row) return null
  return (
    <Table
      style={{ marginTop: '20px' }}
      pagination={false}
      loading={isLoading}
      size="small"
      bordered
      rowKey={(record) => record[15]!}
      columns={ANALYSIS_TIME.map((time) => {
        return {
          title: time + 'min',
          dataIndex: time,
          fixed: 'right',
          key: time,
          render(value, record) {
            return (
              <InputNumber
                max={100}
                min={0}
                style={{ width: '80px' }}
                formatter={(value) => `${value}%`}
                value={value}
                onBlur={() => {
                  if(typeof newChangeValueRef.current !== 'number') {
                    message.info('无变化，不更新')
                    return
                  }
                  setIsLoading(true)
                  tableCoinAlertSetting
                    // @ts-ignore
                    .setCoinAlertSetting(coin, {
                      ...record,
                      [time]: newChangeValueRef.current
                    })
                    .then((res) => {
                      if (res.status === 204) {
                        message.success('设置成功')
                        tableCoinAlertSetting.getCoinAlertSetting(coin).then((res) => {
                          setRow(res)
                          setIsLoading(false)
                        })
                      } else {
                        message.error('设置失败')
                        setIsLoading(false)
                      }
                    })
                }}
                onChange={(value) => {
                  newChangeValueRef.current = value
                }}
              />
            )
          }
        }
      })}
      // @ts-ignore
      dataSource={[row]}
    />
  )
}
