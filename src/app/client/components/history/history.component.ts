import {Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {CandleStick} from "../../../shared/models/candlestick.model";
import {HistoryService} from "../../services/history/history.service";

import {ActivatedRoute} from "@angular/router";
import {DevExtremeModule} from "devextreme-angular";
import {MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatAnchor} from "@angular/material/button";
import {URI} from "../../../shared/constants/bainsight.strings";
import {StompService} from "../../../shared/stomp/stomp.service";
import {rxStompServiceFactory} from "../../../shared/stomp/rx-stomp-service-factory";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PlaceOrderComponent} from "../place-order/place-order.component";

@Component({
  selector: 'history',
  standalone: true,
  imports: [
    DevExtremeModule,
    MatButtonToggleGroup,
    MatAnchor,
    JsonPipe,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit, OnDestroy {

  protected symbol: string;
  protected candles: CandleStick[];
  private timeSpace: string;

  private eventSource: EventSource | null;
  private readonly options = {withCredentials: true};

  private stompService: StompService;
  protected historyService: HistoryService



  constructor(historyService:HistoryService,
              private activeRoute: ActivatedRoute,
              private matDialog: MatDialog)
  {
    this.historyService = historyService;
    this.stompService = rxStompServiceFactory();
    this.symbol = '';
    this.timeSpace = '';
    this.candles = [];
    this.eventSource = null;
  }


  ngOnInit(): void {

    this.activeRoute.url.subscribe(value => {

      this.symbol = value[1].path.toUpperCase();
      this.timeSpace = value[2].path;

      this.fetchSymbolHistoryOnInIt(this.symbol, this.timeSpace);
      
      this.historyService.getStickFromServer(this.symbol);

      this.subscribeToLiveUpdates();

    });
  }

  ngOnDestroy(): void {
    this.clearEventSource();
    this.historyService.unsubscribeAll();
  }

  clearEventSource(){
    if(this.eventSource){
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  customizeToolTip(arg : any){
    return {
      text:`Open: ₹${arg.open}<br/>Close: ₹${arg.close}<br/>High: ₹${arg.high}<br/>Low: ₹${arg.low}`
    }
  }


  fetchHistoryForTimeSpace(timeSpace: string) {

    this.stompService.unsubscribeAll();
    this.clearEventSource();

    this.activeRoute.url.subscribe(value => {
      this.historyService.route(value[1].path.toUpperCase(), timeSpace);
    });

  }

  fetchSymbolHistoryOnInIt(symbol: string, timeSpace: string) {

    this.candles = [];

    const uri: string = URI.concat(`/history/${symbol}/${timeSpace}`);
    this.eventSource = new EventSource(uri, this.options);

    this.eventSource.onmessage = (event) => {
      const stick: CandleStick = JSON.parse(event.data);
      this.candles.push(stick);
    };

    // this.eventSource.onerror = (err) => console.error(err);
  }

  get price(): string {
    return this.historyService.getPrice;
  }


  private subscribeToLiveUpdates() {
    this.historyService.subscribeToLiveUpdates(this.symbol);
  }


  get stick(){
    return this.historyService.stick$;
  }

  protected onBuy(){
    this.matDialog.open(PlaceOrderComponent,
      {data: {symbol: this.symbol, transactionType: 'BID'}}
    );
  }

}
