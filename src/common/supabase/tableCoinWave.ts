/*
CREATE TABLE public.coin_wave (
  id TEXT NOT NULL PRIMARY KEY,
  coin_id TEXT NOT NULL,
  trend TEXT DEFAULT 'up',
  c_0_5 NUMERIC DEFAULT 0,
  c_5_10 NUMERIC DEFAULT 0,
  c_10_15 NUMERIC DEFAULT 0,
  c_15_20 NUMERIC DEFAULT 0,
  c_20_25 NUMERIC DEFAULT 0,
  c_25_30 NUMERIC DEFAULT 0,
  c_30_35 NUMERIC DEFAULT 0,
  c_35_40 NUMERIC DEFAULT 0,
  c_40_45 NUMERIC DEFAULT 0,
  c_45_50 NUMERIC DEFAULT 0,
  c_50_55 NUMERIC DEFAULT 0,
  c_55_60 NUMERIC DEFAULT 0,
  c_60_65 NUMERIC DEFAULT 0,
  c_65_70 NUMERIC DEFAULT 0,
  c_70_75 NUMERIC DEFAULT 0,
  c_75_80 NUMERIC DEFAULT 0,
  c_80_85 NUMERIC DEFAULT 0,
  c_85_90 NUMERIC DEFAULT 0,
  c_90_95 NUMERIC DEFAULT 0,
  c_95_100 NUMERIC DEFAULT 0
) TABLESPACE pg_default;
 */

import { supabase } from '.'
import { AYALYSIS_TIME } from '../const'
import { I_continuous_klines } from '../types'

export interface I_table_row_coin_wave {
  id: string
  coin_id: string
  time_range: number
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
}

function getTableRowCoinWave(coin: string) {
  return new Promise<I_table_row_coin_wave[]>((resolve, reject) => {
    supabase
      .from('coin_wave')
      .select('*')
      .eq('coin_id', coin)
      .then((res) => {
        if (res.error) {
          reject(res.error)
          return
        }
        if (Array.isArray(res.data) && res.data.length) {
          resolve(res.data)
          return
        }
        const rows = AYALYSIS_TIME.map((timeRange) => {
          return {
            id: `${coin}_${timeRange}`,
            coin_id: coin,
            time_range: timeRange,
            c_0_5: 0,
            c_5_10: 0,
            c_10_15: 0,
            c_15_20: 0,
            c_20_25: 0,
            c_25_30: 0,
            c_30_35: 0,
            c_35_40: 0,
            c_40_45: 0,
            c_45_50: 0,
            c_50_55: 0,
            c_55_60: 0,
            c_60_65: 0,
            c_65_70: 0,
            c_70_75: 0,
            c_75_80: 0,
            c_80_85: 0,
            c_85_90: 0,
            c_90_95: 0,
            c_95_100: 0
          }
        })
        supabase
          .from('coin_wave')
          .insert(rows)
          .then((res) => {
            if (res.status === 201) {
              resolve(rows)
              return
            }
            reject(res)
          })
      })
  })
}

async function updateTableRowCoinWave(coin: string, klines: I_continuous_klines[]) {
  if (klines.length !== 600) {
    return
  }
  const rows = await getTableRowCoinWave(coin)
  const newRows = rows.map((row) => {
    const changeInfo = getChangePercent10h(klines,row.time_range)
    return setRowValue(row, changeInfo)
  })
  const res = await supabase.from('coin_wave').upsert(newRows)
  return res
  function setRowValue(row: I_table_row_coin_wave, value: number) {
    value = value * 100
    if (value >= 0 && value <= 5) {
      row.c_0_5 = row.c_0_5 + 1
      return row
    }
    if (value > 5 && value <= 10) {
      row.c_5_10 = row.c_5_10 + 1
      return row
    }
    if (value > 10 && value <= 15) {
      row.c_10_15 = row.c_10_15 + 1
      return row
    }
    if (value > 15 && value <= 20) {
      row.c_15_20 = row.c_15_20 + 1
      return row
    }
    if (value > 20 && value <= 25) {
      row.c_20_25 = row.c_20_25 + 1
      return row
    }
    if (value > 25 && value <= 30) {
      row.c_25_30 = row.c_25_30 + 1
      return row
    }
    if (value > 30 && value <= 35) {
      row.c_30_35 = row.c_30_35 + 1
      return row
    }
    if (value > 35 && value <= 40) {
      row.c_35_40 = row.c_35_40 + 1
      return row
    }
    if (value > 40 && value <= 45) {
      row.c_40_45 = row.c_40_45 + 1
      return row
    }
    if (value > 45 && value <= 50) {
      row.c_45_50 = row.c_45_50 + 1
      return row
    }
    if (value > 50 && value <= 55) {
      row.c_50_55 = row.c_50_55 + 1
      return row
    }
    if (value > 55 && value <= 60) {
      row.c_55_60 = row.c_55_60 + 1
      return row
    }
    if (value > 60 && value <= 65) {
      row.c_60_65 = row.c_60_65 + 1
      return row
    }
    if (value > 65 && value <= 70) {
      row.c_65_70 = row.c_65_70 + 1
      return row
    }
    if (value > 70 && value <= 75) {
      row.c_70_75 = row.c_70_75 + 1
      return row
    }
    if (value > 75 && value <= 80) {
      row.c_75_80 = row.c_75_80 + 1
      return row
    }
    if (value > 80 && value <= 85) {
      row.c_80_85 = row.c_80_85 + 1
      return row
    }
    if (value > 85 && value <= 90) {
      row.c_85_90 = row.c_85_90 + 1
      return row
    }
    if (value > 90 && value <= 95) {
      row.c_90_95 = row.c_90_95 + 1
      return row
    }
    if (value > 95 && value <= 100) {
      row.c_95_100 = row.c_95_100 + 1
      return row
    }
    return row
  }
}
export function getChangePercent10h(klines: I_continuous_klines[], timeLimit) {
  const min = Math.min(...klines.map((item) => item.end_time_price))
  const max = Math.max(...klines.map((item) => item.end_time_price))
  const minLast15 = Math.min(...klines.slice(-timeLimit).map((item) => item.end_time_price))
  const maxLast15 = Math.max(...klines.slice(-timeLimit).map((item) => item.end_time_price))
  const changePercent = (maxLast15 - minLast15) / (max - min)
  return Number(changePercent.toFixed(2))
}
export const tableCoinWave = {
  getTableRowCoinWave,
  updateTableRowCoinWave
}
