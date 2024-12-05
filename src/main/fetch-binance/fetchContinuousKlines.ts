/*
https://developers.binance.com/docs/zh-CN/derivatives/usds-margined-futures/market-data/rest-api/Kline-Candlestick-Data
*/

import fetch from 'node-fetch'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { REQUEST_HEADER } from './REQUEST_HEADER'
import { I_continuous_klines } from '../../common/types'
// export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
const proxyUrl = `http://127.0.0.1:7890`
const proxyAgent = new HttpsProxyAgent(proxyUrl)
/*
[
  [
    1499040000000,      // 开盘时间0
    "0.01634790",       // 开盘价1
    "0.80000000",       // 最高价2
    "0.01575800",       // 最低价3
    "0.01577100",       // 收盘价(当前K线未结束的即为最新价)4
    "148976.11427815",  // 成交量5
    1499644799999,      // 收盘时间6
    "2434.19055334",    // 成交额7
    308,                // 成交笔数8
    "1756.87402397",    // 主动买入成交量9
    "28.46694368",      // 主动买入成交额10
    "17928899.62484339" // 请忽略该参数
  ]
]
*/

function BinanceToTableData(coin: string, items: number[]) {
  const isValidateItems = items.every((item) => {
    return item !== null && item !== undefined
  })
  if (!isValidateItems) return
  items = items.map((item) => Number(item))
  const obj: I_continuous_klines = {
    id: coin + '-' + items[0] + '-' + items[6],
    coin,
    start_time: items[0],
    start_time_price: items[1],
    high: items[2],
    low: items[3],
    end_time_price: items[4],
    turnover: items[5],
    end_time: items[6],
    trade_volume: items[8],
    number_of_trade: items[9],
    active_buying_volume: items[9],
    active_buying_turnover: items[10],
    average_price: (items[1] + items[4]) / 2,
    time: items[6]
  }
  return obj
}
export function fetchContinuousKlines(coin = 'SUI', limit = 300, interval = 1, timeout = 1000 * 8) {
  return new Promise((resolve, reject) => {
    let success = false
    setTimeout(() => {
      if (!success) {
        reject('请求超时')
      }
    }, timeout)
    fetch(
      `https://www.binance.com/fapi/v1/continuousKlines?limit=${limit}&pair=${coin}USDT&contractType=PERPETUAL&interval=${interval}m`,
      {
        headers: REQUEST_HEADER,
        agent: proxyAgent,
        body: null,
        method: 'GET'
      }
    )
      .then((res) => {
        res.json().then((data: any) => {
          try {
            const klineDatas = data.map((item) => {
              return BinanceToTableData(coin, item)
            })
            resolve(klineDatas as I_continuous_klines[])
            success = true
          } catch (err) {
            console.log(err, data)
            resolve([])
          }
        })
      })
      .catch((err) => {
        console.log(err)
        resolve([])
      })
  })
}
