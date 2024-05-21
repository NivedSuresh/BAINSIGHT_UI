import {computed, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CandleStick} from "../../../shared/models/candlestick.model";
import {firstValueFrom} from "rxjs";
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
      });

    console.log("Subscribed to: " + symbol + ". Sub = " + sub);
    this.stompService.pushToSubscriptionList(sub);
  }

  public unsubscribeAll(){
    this.stompService.unsubscribeAll();
  }

  get getStick() : CandleStick{
    return this.stick;
  }

  public getStickFromServer(symbol: string) {
    if(this.stick?.symbol) return;
    this.http.get<CandleStick>(URI.concat(`/risk/stick/${symbol}`), {withCredentials: true})
      .subscribe(value => {
        this.stick = value;
      });
  }
}
