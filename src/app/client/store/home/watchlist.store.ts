import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {watchlistState} from "./home.state";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {WatchlistService} from "../../services/watchlist/watchlist.service";
import {WatchlistDto} from "../../../shared/models/watchlist.model";
import {HttpStatusCode} from "@angular/common/http";
import {CandleStick} from "../../../shared/models/candlestick.model";


export const watchlistStore =
  signalStore({providedIn : "root"},
  withState(watchlistState),

    withMethods((store,
                 watchlistService: WatchlistService = inject(WatchlistService),
                 toastrService: ToastrService = inject(ToastrService),
                 router: Router = inject(Router),
    ) => ({

      async fetchPinnedWatchlist(page: number)  {
          try{
            const  pinnedList : WatchlistDto = await watchlistService.fetchPinnedWatchlist(page);
            console.log(pinnedList);
            patchState(store, {watchlistDto: pinnedList, message:''});
          }
          catch (err:any){
            if(err.error.status == HttpStatusCode.ExpectationFailed){
              patchState(store, {message : err.error.message})
            }
          }

      },

      updateStick(newStick: CandleStick){
        patchState(store, state => {

          const sticks = state.watchlistDto.sticks;


          let found : boolean = false;


          for(let stick of sticks){
            if(stick.symbol === newStick.symbol){
              stick.low = newStick.low;
              stick.high = newStick.high;
              stick.volume = newStick.volume;
              stick.change = newStick.change;
              stick.open = newStick.open;
              stick.close = newStick.close
              stick.exchangePrices = newStick.exchangePrices;
              stick.timeStamp = newStick.timeStamp;
              found = true;
              break;
            }
          }

          if(!found) {
            sticks.push(newStick);
            console.log("not found");
          }

          return state;
        })
      },

      async fetchWatchlist(page: number, tag: string)  {
       try
       {
         const  watchlistMeta = await watchlistService.fetchWatchlist(page, tag);
         patchState(store, {
           watchlistDto: watchlistMeta.watchlistDto,
           message: '', tags: watchlistMeta.tags
         });
       }
       catch (err: any)
       {
         if(err.error.status === 503){
           toastrService.error('Service Unavailable!');
           return;
         }
         toastrService.error(err.error.message);
       }
      },

      async createWatchlist(name: string){
        try
        {
          const watchlistDto: WatchlistDto = await watchlistService.createWatchlist(name);
          store.tags().push(watchlistDto.watchlistName);
          patchState(store, { watchlistDto: watchlistDto });
        }
        catch (err: any)
        {
          toastrService.error(err.error.message);
        }
      },

      async addToWatchlist(symbol: string){
        try
        {
          console.log(store.watchlistDto())
          const watchlistDto : WatchlistDto = await watchlistService.addToWatchlist(store.watchlistDto().bainsightPage.page, store.watchlistDto().watchlistName, symbol);
          patchState(store, {watchlistDto: watchlistDto});
        }
        catch (err: any)
        {
          console.log(err)
          toastrService.error(err?.error?.message);
        }
      },

      emptySticks(){
        const dto = store.watchlistDto;
        const newDto :WatchlistDto = {watchlistId: 0, sticks: [], bainsightPage: {page: 1, next: false, prev: false}, watchlistName: ''};
        patchState(store, {watchlistDto: newDto});
      }

  })),
)
