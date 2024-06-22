import {inject, Injectable, WritableSignal} from '@angular/core';
import {RxStomp} from "@stomp/rx-stomp";
import {CandleStick} from "../models/candlestick.model";
import {Subscription} from "rxjs";
import {watchlistStore} from "../../client/store/home/watchlist.store";

@Injectable({
  providedIn: 'root'
})
export class StompService extends RxStomp{

  private subscriptions: Subscription[];
  private watchlistStore = inject(watchlistStore);

  constructor(
  ) {
    super();
    this.subscriptions = [];
  }


  public subscribeAll(sticks: CandleStick[]){
    if(!sticks) return;
    sticks.forEach(stick => this.subscribeForTicker(stick.symbol));
  }

  public subscribeForTicker(symbol: string) {
    if(!symbol) return;

    const sub = this.watch(`/topic/${symbol}`)
      .subscribe(message => {
        this.watchlistStore.updateStick(JSON.parse(message.body));
      });

    this.pushToSubscriptionList(sub);
  }

  public pushToSubscriptionList(sub: Subscription){
    this.subscriptions.push(sub);
    console.log("Subscribed list: " + this.subscriptions.toString());
  }


  public unsubscribeAll(){
    console.log("unsubscribing all : " + this.subscriptions.toString());
    while (this.subscriptions.length > 0){
      const sub : Subscription | undefined = this.subscriptions.pop();
      if(sub){
        console.log("Killing " + sub)
        sub.unsubscribe();
      }
    }
  }




}
