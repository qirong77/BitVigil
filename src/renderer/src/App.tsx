import { SingleCoin } from './single-coin'

export default function App() {
  return (
    <div>
      {['BTC', 'ETH', 'BCH', 'SUI', 'BNB'].map((item) => (
        <SingleCoin key={item} coin={item} />
      ))}
    </div>
  )
}
