import {Injectable} from '@angular/core';
import {CandleStick} from "../models/candlestick.model";

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }


  get mockStick (): CandleStick {
    return {
      change: this.random,
      close: this.random,
      low: this.random,
      high: this.random,
      open: this.random,
      symbol: 'AAPL',
      exchangePrices: [{exchange: 'NSE', lastTradedPrice: this.random}, {exchange: 'BSE', lastTradedPrice: this.random}],
      volume: this.random,
      timeStamp: new Date()
    }
  }

  get random(): number{
    let num = (Math.random() * 1000)
    return Math.round(num);
  }
}
