import {computed, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CandleStick} from "../../../shared/models/candlestick.model";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {URI} from "../../../shared/constants/bainsight.strings";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {StompService} from "../../../shared/stomp/stomp.service";
import {rxStompServiceFactory} from "../../../shared/stomp/rx-stomp-service-factory";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {


  private stompService: StompService;
  private stick!: CandleStick;
  price: string = '';

  public stick$: Subject<CandleStick> = new Subject();

  constructor(
    private http : HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.stompService = rxStompServiceFactory();
  }


  public fetchLosersAndGainersForTheDay() : Promise<CandleStick[]>{
    return firstValueFrom(this.http.get<CandleStick[]>(URI.concat("/history/losers_gainers"), {withCredentials: true}));
  }

  route(symbol: string, timeSpace: string) {
    this.router.navigateByUrl(`history/${symbol}/${timeSpace}`).then(r => {});
  }

  subscribeToLiveUpdates(symbol : string) {
    const sub = this.stompService.watch(`/topic/${symbol}`)
      .subscribe(message => {
        this.stick = JSON.parse(message.body);
        this.stick$.next(this.stick);
      });

    this.stompService.pushToSubscriptionList(sub);
  }

  public unsubscribeAll(){
    this.stompService.unsubscribeAll();
  }

  get getStick() : CandleStick{
    return this.stick;
  }

  public getStickFromServer(symbol: string) {
    if(this.stick?.symbol && this.stick.symbol === symbol) return;
    this.http.get<CandleStick>(URI.concat(`/risk/stick/${symbol}`), {withCredentials: true})
      .subscribe(value => {
        this.stick = value;
        this.stick$.next(this.stick);
      });
  }

  get getPrice(): string {
    return this.getStick?.exchangePrices[0]?.lastTradedPrice ?
      `: ₹${this.getStick.exchangePrices[0].lastTradedPrice}`
      : '';
  }


}
