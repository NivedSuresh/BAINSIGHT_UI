

export type ExchangePrice = {
  exchange: string,
  lastTradedPrice: number
}

export type CandleStick = {
  symbol : string,
  timeStamp: Date
  open: number,
  high: number,
  close: number,
  low: number,
  change: number,
  volume: number,
  exchangePrices: ExchangePrice[]
}
