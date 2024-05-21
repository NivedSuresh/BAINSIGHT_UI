import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {CandleStick} from "../../../shared/models/candlestick.model";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle} from "@angular/material/card";
import {NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";
import {MockService} from "../../../shared/service/mock.service";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {HistoryService} from "../../services/history/history.service";


export interface LoserGainer {
  sticks: CandleStick[]
}

@Component({
  selector: 'gainer-loser',
  standalone: true,
  imports: [
    MatToolbar,
    MatCard,
    NgForOf,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    NgOptimizedImage,
    NgStyle,
    SlickCarouselModule
  ],
  templateUrl: './gainer-loser.component.html',
  styleUrl: './gainer-loser.component.css'
})
export class GainerLoserComponent implements OnInit{



  lgs : WritableSignal<CandleStick[]> = signal([]);



  constructor(
    private historyService: HistoryService
  )
  {}

  async ngOnInit(): Promise<void> {
    const lgs = await this.historyService.fetchLosersAndGainersForTheDay();
    this.lgs.set(lgs);
  }


  routeToHistory(symbol: string) {
    this.historyService.route(symbol, "1D");
  }
}
