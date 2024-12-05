import { FilterFilled } from '@ant-design/icons'
import { Popover, Radio } from 'antd'
import { useState } from 'react'
export function KlineTimeFilter({ updateKline }) {
  /*
  10h = 600 * 1
  24h = 288 * 5
  48h = 576 * 5
  72h = 864 * 15
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
              updateKline(288, 5).then(() => setValue(24))
            }
            if (value === 48) {
              updateKline(576, 5).then(() => setValue(48))
            }
            if (value === 72) {
              updateKline(864, 15).then(() => setValue(72))
            }
          }}
        >
          {[10, 24, 48, 72].map((item) => (
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
