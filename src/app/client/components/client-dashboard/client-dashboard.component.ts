import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GainerLoserComponent} from "../gainer-loser/gainer-loser.component";
import {PinnedWatchlistComponent} from "../pinned-watchlist/pinned-watchlist.component";

@Component({
  selector: 'main',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    GainerLoserComponent,
    PinnedWatchlistComponent,
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

  // private stompService: RxStompService;
  // private subscriptions: Subscription[];
  // homeStore = inject(homeStore);
  //
  // constructor() {
  //   this.stompService = rxStompServiceFactory();
  //   this.subscriptions = [];
  // }
  //
  // async ngOnInit(): Promise<void> {
  //   /* TODO: FETCH WATCHLIST */
  //   await this.homeStore.fetchPinnedWatchlistOnInit();
  //   const sticks = this.homeStore.sticks();
  //
  //   // sticks.forEach(stick => this.subscribeForTicker(stick.symbol));
  // }
  //
  //
  // private subscribeForTicker(value: string) {
  //   this.subscriptions.push(this.stompService.watch('/topic/'.concat(value))
  //     .subscribe(message => {
  //       console.log('Received message:', message.body);
  //     }));
  // }
  //
  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(sub => {
  //     sub.unsubscribe();
  //   })
  // }
  //


}
