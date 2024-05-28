import {Route} from "@angular/router";
import {ClientDashboardComponent} from "../components/client-dashboard/client-dashboard.component";
import {ProfileComponent} from "../../shared/components/profile/profile.component";
import {PortfolioComponent} from "../components/portfolio/portfolio.component";
import {WatchlistComponent} from "../components/watchlist/watchlist.component";
import {WalletComponent} from "../components/wallet/wallet.component";
import {HistoryComponent} from "../components/history/history.component";
import {OrderComponent} from "../components/order-persistence/order.component";
import {canActivateGuard} from "../../app.routes";

export const clientRoutes: Route[] = [
  {
    path: '',
    component: ClientDashboardComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [canActivateGuard]
  }
]
