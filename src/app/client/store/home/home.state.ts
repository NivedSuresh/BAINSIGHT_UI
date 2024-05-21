import {WatchlistMeta} from "../../../shared/models/watchlist.model";


export interface PinnedWatchState extends WatchlistMeta{
  message: string
}

export const watchlistState : PinnedWatchState = {
  watchlistDto: {
    watchlistId: -1,
    watchlistName: '',
    sticks: [],
    bainsightPage: {page: 1, next: false, prev: false},
  },
  tags: [],
  message: '',
}






