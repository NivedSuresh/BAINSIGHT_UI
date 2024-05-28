import {Component, computed, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {rxStompServiceFactory} from "../../../shared/stomp/rx-stomp-service-factory";
import {watchlistStore} from "../../store/home/watchlist.store";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {StompService} from "../../../shared/stomp/stomp.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {WatchlistDto} from "../../../shared/models/watchlist.model";
import {HistoryService} from "../../services/history/history.service";
import {Router} from "@angular/router";


@Component({
  selector: 'pinned-watchlist',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardTitleGroup,
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    MatToolbar,
    MatCardActions,
    MatButton,
    NgStyle,
    NgIf
  ],
  templateUrl: './pinned-watchlist.component.html',
  styleUrl: './pinned-watchlist.component.css'
})
export class PinnedWatchlistComponent implements OnInit, OnDestroy{

  private stompService: StompService;
  watchlistStore = inject(watchlistStore);


  watchlistDto: Signal<WatchlistDto> = computed(() => this.watchlistStore.watchlistDto());

  constructor(private historyService: HistoryService, private route: Router) {
    this.stompService = rxStompServiceFactory();
    this.watchlistDto = computed(() => {
      const watchlistDto = this.watchlistStore.watchlistDto();
      this.stompService.subscribeAll(watchlistDto.sticks);
      return watchlistDto;
    });
  }


  async ngOnInit(): Promise<void> {
    /* TODO: FETCH WATCHLIST */
    await this.watchlistStore.fetchPinnedWatchlist(1);
  }



  ngOnDestroy(): void {
    this.unsubscribeAll();
  }


  protected async fetchPage(page: number){
    this.unsubscribeAll();
    await this.watchlistStore.fetchPinnedWatchlist(page);
  }


  private unsubscribeAll() {
    this.stompService.unsubscribeAll();
    this.watchlistStore.emptySticks();
  }

  routeToHistory(symbol: string) {
    this.historyService.route(symbol, "1D");
  }

  routeToWatchlist() {
    this.route.navigateByUrl("watchlist").then();
  }
}
