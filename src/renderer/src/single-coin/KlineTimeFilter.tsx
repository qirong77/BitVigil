import { FilterFilled } from '@ant-design/icons'
import { Popover, Radio } from 'antd'
import { useState } from 'react'
/*
75 / 60 =
*/
export function KlineTimeFilter({ updateKline }) {
  /*
  10h = 600 * 1
  24h = 700 * 5
  48h = 700 * 10
  */
  const [value, setValue] = useState(10)
  return (
    <Popover
      content={
        <Radio.Group
          value={value}
          onChange={(e) => {
            const value = e.target.value
            if (value === 10) {
              updateKline(600, 1).then(() => setValue(10))
            }
            if (value === 24) {
              updateKline(700, 5).then(() => setValue(24))
            }
            if (value === 48) {
              updateKline(700, 10).then(() => setValue(48))
            }
          }}
        >
          {[10, 24, 48].map((item) => (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          ))}
        </Radio.Group>
      }
    >
      <FilterFilled style={{ cursor: 'pointer' }} />
    </Popover>
  )
}
