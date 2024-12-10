import { InputNumber, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { AYALYSIS_TIME } from '../../../../common/const'
import {
  I_coin_alert_setting,
  tableCoinAlertSetting
} from '../../../../common/supabase/tableCoinAlertSetting'

export function CoinWaveAlertSettingTable({ coin }) {
  const [row, setRow] = useState<I_coin_alert_setting>()
  const [isLoading, setIsLoading] = useState(false)
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
      columns={AYALYSIS_TIME.map((time) => {
        return {
          title: time + 'min',
          dataIndex: time,
          fixed: 'right',
          render(value, record) {
            return (
              <InputNumber
                max={100}
                min={0}
                style={{ width: '80px' }}
                formatter={(value) => `${value}%`}
                value={value}
                onChange={(newValue) => {
                  setIsLoading(true)
                  tableCoinAlertSetting
                    // @ts-ignore
                    .setCoinAlertSetting(coin, {
                      ...record,
                      [time]: newValue
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
