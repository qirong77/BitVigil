import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AYALYSIS_TIME } from '../../../../common/const'

export function CoinWaveAlertSettingTable({ coin }) {
  useEffect(() => {}, [])
  return (
    <Table
      pagination={false}
      size="small"
      bordered
      rowKey={(record) => record[15]!}
      columns={AYALYSIS_TIME.map((time) => {
        return {
          title: time + 'min',
          dataIndex: time,
          render(value, record, index) {
            return value
          }
        }
      })}
      dataSource={[]}
    />
  )
}
