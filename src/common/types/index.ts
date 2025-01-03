export interface I_continuous_klines {
  id: string
  coin: string
  start_time: number
  start_time_price: number
  end_time: number
  end_time_price: number
  high: number
  low: number
  turnover: number
  trade_volume: number
  number_of_trade: number
  active_buying_volume: number
  active_buying_turnover: number
  average_price: number
  time: number
}

export interface I_coin_wave {
  id: string
  c_0_5: number
  c_5_10: number
  c_10_15: number
  c_15_20: number
  c_20_25: number
  c_25_30: number
  c_30_35: number
  c_35_40: number
  c_40_45: number
  c_45_50: number
  c_50_55: number
  c_55_60: number
  c_60_65: number
  c_65_70: number
  c_70_75: number
  c_75_80: number
  c_80_85: number
  c_85_90: number
  c_90_95: number
  c_95_100: number
  coin_id: string
  tag: number
}

export enum E_CONTINOUS_KLINE_INTERVAL {
  ONE_MIN = 1,
  THREE_MIN = 3,
  FIVE_MIN = 5,
  THIRTY_MIN = 30,
  TWO_HOUR = 120,
  SIX_HOUR = 360,
  EIGHt_HOUR = 480,
  HALF_DAY = 720
}
