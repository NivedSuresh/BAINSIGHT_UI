import {CandleStick} from "./candlestick.model";


export type Page = {
  page: number,
  next: boolean,
  prev: boolean
}

export type WatchlistDto = {
  watchlistId: number,
  watchlistName: string,
  sticks: CandleStick[],
  bainsightPage: Page,
  pinned: boolean
}

export type WatchlistMeta = {
  watchlistDto: WatchlistDto,
  tags: string[]
}
