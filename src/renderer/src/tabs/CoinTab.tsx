import { SingleCoin } from "../single-coin";

export function CoinTab() {
  return (
    <div>
      {['BTC', 'ETH', 'BNB', 'DOGE', 'BCH','SUI','1000SHIB','1000PEPE','1000FLOKI','DIA'].map(
        (item) => (
          <SingleCoin key={item} coin={item} />
        )
      )}
    </div>
  )
}
