import { Form, InputNumber, message } from 'antd'
import { useEffect, useState } from 'react'
import {
  I_coin_alert_setting,
  tableCoinAlertSetting
} from '../../../../common/supabase/tableCoinAlertSetting'

export function PriceAlert({ coin }) {
  const [row, setRow] = useState<I_coin_alert_setting>()
  useEffect(() => {
    tableCoinAlertSetting.getCoinAlertSetting(coin).then((res) => {
      setRow(res)
    })
  }, [coin])
  return (
    <Form layout='inline' style={{ margin: '10px 0 20px 0' }} >
      <Form.Item label="gt">
        <InputNumber
          value={row?.gt || 0}
          onChange={(value) => {
            // @ts-ignore
            setRow({ ...row, gt: value })
          }}
          onBlur={(e) => {
            const value = e.target.value
            // @ts-ignore
            tableCoinAlertSetting.setCoinAlertSetting(coin, { ...row, gt: value }).then((res) => {
              if (res.status === 204) {
                message.success('设置成功')
                tableCoinAlertSetting.getCoinAlertSetting(coin).then((res) => {
                  setRow(res)
                })
              }
            })
          }}
        />
      </Form.Item>
      <Form.Item label="lt">
        <InputNumber
          value={row?.lt || 0}
          onChange={(value) => {
            // @ts-ignore
            setRow({ ...row, lt: value })
          }}
          onBlur={(e) => {
            const value = e.target.value
            // @ts-ignore
            tableCoinAlertSetting.setCoinAlertSetting(coin, { ...row, lt: value }).then((res) => {
              if (res.status === 204) {
                message.success('设置成功')
                tableCoinAlertSetting.getCoinAlertSetting(coin).then((res) => {
                  setRow(res)
                })
              }
            })
          }}
        />
      </Form.Item>
    </Form>
  )
}
