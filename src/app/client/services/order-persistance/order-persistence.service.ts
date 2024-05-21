import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URI} from "../../../shared/constants/bainsight.strings";
import {OrderStateType} from "../../store/order/order.state";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderPersistenceService {

  constructor(private http: HttpClient){

  }

  public async fetchOrders(page: number){
    if(page === 0) page = 1;
    return firstValueFrom(this.http.get<OrderStateType>(URI.concat(`/persistence?page=${page}`), {withCredentials:true}));
  }


}
