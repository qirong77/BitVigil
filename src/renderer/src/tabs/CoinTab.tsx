import { Divider, Switch } from "antd";
import { MAIN_COINS } from "../../../common/coins/MAIN_COINS";
import { SingleCoin } from "../single-coin";
import { useState } from "react";

export function CoinTab() {
  const [openAlert, setOpenAlert] = useState(true)
  return (
    <div>
      <Divider/>
      <span style={{display:'flex'}}>
        <span>🔔：</span>
       <Switch value={openAlert} onChange={setOpenAlert}/>
      </span>
      <Divider/>
      {MAIN_COINS.map(
        (item) => (
          <SingleCoin openAlertAll={openAlert} key={item} coin={item} />
        )
      )}
    </div>
  )
}
