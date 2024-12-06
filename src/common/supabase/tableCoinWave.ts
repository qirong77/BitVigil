/*
CREATE TABLE public.coin_wave (
  id TEXT NOT NULL PRIMARY KEY,
  coin_id TEXT NOT NULL,
  time_range NUMERIC NOT NULL,
  c_0_10 NUMERIC DEFAULT 0,
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
import { getKlineInfo } from '../kline/getKlineInfo'
import { I_continuous_klines } from '../types'

export interface I_table_row_coin_wave {
  id: string
  coin_id: string
  time_range: number
  c_0_10: number
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
            c_0_10: 0,
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
    const changeInfo = getKlineInfo(klines.slice(-row.time_range))
    const changePercentNumber = changeInfo?.changePercentNumber || 0
    return setRowValue(row, changePercentNumber)
  })
  const res = await supabase.from('coin_wave').upsert(newRows)
  return res
  function setRowValue(row: I_table_row_coin_wave, value: number) {
    value = value * 100
    if (value > 0 && value <= 1) {
      row.c_0_10 = row.c_0_10 + 1
      return row
    }
    if (value > 1 && value <= 1.5) {
      row.c_10_15 = row.c_10_15 + 1
      return row
    }
    if (value > 1.5 && value <= 2) {
      row.c_15_20 = row.c_15_20 + 1
      return row
    }
    if (value > 2 && value <= 2.5) {
      row.c_20_25 = row.c_20_25 + 1
      return row
    }
    if (value > 2.5 && value <= 3) {
      row.c_25_30 = row.c_25_30 + 1
      return row
    }
    if (value > 3 && value <= 3.5) {
      row.c_30_35 = row.c_30_35 + 1
      return row
    }
    if (value > 3.5 && value <= 4) {
      row.c_35_40 = row.c_35_40 + 1
      return row
    }
    if (value > 4 && value <= 4.5) {
      row.c_40_45 = row.c_40_45 + 1
      return row
    }
    if (value > 4.5 && value <= 5) {
      row.c_45_50 = row.c_45_50 + 1
      return row
    }
    if (value > 5 && value <= 5.5) {
      row.c_50_55 = row.c_50_55 + 1
      return row
    }
    if (value > 5.5 && value <= 6) {
      row.c_55_60 = row.c_55_60 + 1
      return row
    }
    if (value > 6 && value <= 6.5) {
      row.c_60_65 = row.c_60_65 + 1
      return row
    }
    if (value > 6.5 && value <= 7) {
      row.c_65_70 = row.c_65_70 + 1
      return row
    }
    if (value > 7 && value <= 7.5) {
      row.c_70_75 = row.c_70_75 + 1
      return row
    }
    if (value > 7.5 && value <= 8) {
      row.c_75_80 = row.c_75_80 + 1
      return row
    }
    if (value > 8 && value <= 8.5) {
      row.c_80_85 = row.c_80_85 + 1
      return row
    }
    if (value > 8.5 && value <= 9) {
      row.c_85_90 = row.c_85_90 + 1
      return row
    }
    if (value > 9 && value <= 9.5) {
      row.c_90_95 = row.c_90_95 + 1
      return row
    }
    row.c_95_100 = row.c_95_100 + 1
    return row
  }
}
export const tableCoinWave = {
  getTableRowCoinWave,
  updateTableRowCoinWave
}
