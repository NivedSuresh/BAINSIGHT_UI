import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Page, WatchlistDto, WatchlistMeta} from "../../../shared/models/watchlist.model";
import {URI, WATCHLIST_URI} from "../../../shared/constants/bainsight.strings";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  constructor(
    private httpClient: HttpClient
  ) { }


  public async fetchPinnedWatchlist(page: number) : Promise<WatchlistDto>{
    return firstValueFrom(this.httpClient.get<WatchlistDto>(WATCHLIST_URI.concat(`?page=${page}&count=5`), {withCredentials : true}));
  }


  async fetchWatchlist(page: number, tag: string): Promise<WatchlistMeta> {
    if(!tag) tag = '';
    return firstValueFrom(this.httpClient.get<WatchlistMeta>(URI.concat(`/watchlist/meta?page=${page}&tag=${tag}&count=10`), {withCredentials : true}));
  }

  async createWatchlist(name: string) : Promise<WatchlistDto> {
    return firstValueFrom(this.httpClient.post<WatchlistDto>(URI.concat('/watchlist'), {watchlistName: name}, {withCredentials : true}));
  }

  addToWatchlist(page: number, watchlistName: string, symbol: string) : Promise<WatchlistDto> {
    return firstValueFrom(this.httpClient.put<WatchlistDto>(
      URI.concat(`/watchlist?page=${page}`),
      { watchlistName: watchlistName, symbol: symbol },
      { withCredentials: true })
    );
  }
}
