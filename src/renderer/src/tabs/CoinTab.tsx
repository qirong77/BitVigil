import { MAIN_COINS } from "../../../common/coins/MAIN_COINS";
import { SingleCoin } from "../single-coin";

export function CoinTab() {
  return (
    <div>
      {MAIN_COINS.map(
        (item) => (
          <SingleCoin key={item} coin={item} />
        )
      )}
    </div>
  )
}
