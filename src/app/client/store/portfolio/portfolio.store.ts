import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {watchlistState} from "../home/home.state";
import {WatchlistService} from "../../services/watchlist/watchlist.service";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {WatchlistDto} from "../../../shared/models/watchlist.model";
import {HttpStatusCode} from "@angular/common/http";
import {CandleStick} from "../../../shared/models/candlestick.model";
import {portfolioState, PortfolioStateType} from "./portfolio.state";
import {PortfolioService} from "../../services/portfolio/portfolio.service";
import {PortfolioSymbol} from "../../../shared/models/portfolio-symbol.model";


export const portfolioStore =
  signalStore({providedIn : "root"},
    withState(portfolioState),

    withMethods((store,
                 portfolioService: PortfolioService = inject(PortfolioService),
                 toastr: ToastrService = inject(ToastrService)) => ({


      async fetchPortfolioSymbols(page: number){
        try{
          const newState : PortfolioStateType = await portfolioService.fetchPortfolioSymbols(page);
          console.log(newState);
          patchState(store, {portfolioSymbols: newState.portfolioSymbols, page: newState.page});
        }
        catch (ex: any){ toastr.error(ex.error.message); }
      }


    })),
    )
