import {Route} from "@angular/router";
import {ClientDashboardComponent} from "../components/client-dashboard/client-dashboard.component";
import {ProfileComponent} from "../../shared/components/profile/profile.component";
import {PortfolioComponent} from "../components/portfolio/portfolio.component";
import {WatchlistComponent} from "../components/watchlist/watchlist.component";
import {WalletComponent} from "../components/wallet/wallet.component";
import {HistoryComponent} from "../components/history/history.component";
import {OrderComponent} from "../components/order-persistence/order.component";

export const clientRoutes: Route[] = [
  {
    path: '',
    component: ClientDashboardComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'watchlist',
    component: WatchlistComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  }
  // {
  //   path: 'history/:symbol/:timeSpace',
  //   component: HistoryComponent
  // }
]
