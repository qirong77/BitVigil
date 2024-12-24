import { FilterFilled } from '@ant-design/icons'
import { Popover, Radio } from 'antd'
import { useState } from 'react'
export function KlineTimeFilter({ updateKline }) {
  const [value, setValue] = useState(10)
  return (
    <Popover
      content={
        <Radio.Group
          value={value}
          onChange={(e) => {
            const value = e.target.value
            if (value === 10) {
              updateKline(10 * 60, true).then(() => setValue(10))
            }
            if (value === 24) {
              updateKline(60 * 24, true).then(() => setValue(24))
            }
            if (value === 48) {
              updateKline(60 * 48, true).then(() => setValue(48))
            }
            if (value === 72) {
              updateKline(60 * 72, true).then(() => setValue(72))
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
