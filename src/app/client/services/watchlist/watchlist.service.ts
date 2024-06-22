import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Page, WatchlistDto, WatchlistMeta} from "../../../shared/models/watchlist.model";
import {URI, WATCHLIST_URI} from "../../../shared/constants/bainsight.strings";
import {catchError, firstValueFrom, map} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService
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

  async removeSymbol(symbol: string, watchlistId: number): Promise<boolean> {
    const url = `${URI}/watchlist`;
    const req = new HttpRequest('DELETE', url, {symbol: symbol, watchlistId: watchlistId}, { withCredentials: true });



    return new Promise((resolve, reject) => {
      this.httpClient.request(req)
        .pipe(
          map(response => true),
          catchError(error => {
            this.toastr.error(error.error.message);
            return [false];
          })
        )
        .subscribe(
          status => resolve(status),
          () => resolve(false)
        );
    });
  }

  async pinWatchlist(watchlistId: number) {
    try{
      await firstValueFrom(this.httpClient.put(`${URI}/watchlist/pin?id=${watchlistId}`, {}, {withCredentials:true}));
      return true;
    }
    catch (error: any){
      this.toastr.error(error.error.message);
      return false;
    }
  }
}
