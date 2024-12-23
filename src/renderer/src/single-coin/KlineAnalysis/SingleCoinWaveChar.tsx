import { useState } from 'react'
import { Radio } from 'antd'
import { ANALYSIS_TIME } from '../../../../common/const'
import { SingleCoinWavePieChar } from './SingleCoinWavePieChar/SingleCoinWavePieChar'

export function SingleCoinWaveChar({ coin }: { coin: string }) {
  const [radioValue, setRadioValue] = useState(30)
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', alignItems: 'center' }}
    >
      <Radio.Group
        value={radioValue}
        onChange={(e) => {
          setRadioValue(e.target.value)
        }}
      >
        {ANALYSIS_TIME.map((item) => {
          return (
            <Radio key={item + ''} value={item}>
              {item}
            </Radio>
          )
        })}
      </Radio.Group>
      <SingleCoinWavePieChar coin={coin} interval={radioValue} />
    </div>
  )
}
