import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {URI} from "../../../shared/constants/bainsight.strings";
import {PagedTransactions, WalletStateType} from "../../store/wallet/wallet.state";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }


  async fetchWalletAndTransactions() {
    return firstValueFrom(this.http.get<WalletStateType>(URI.concat(`/wallet`), {withCredentials:true}));
  }

  async fetchTransactions(page: number) {
    return firstValueFrom(this.http.get<PagedTransactions>(URI.concat(`/wallet/transactions?page=${page}`), {withCredentials: true}));
  }
}
