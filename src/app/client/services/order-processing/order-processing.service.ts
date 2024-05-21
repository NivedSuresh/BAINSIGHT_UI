import { Injectable } from '@angular/core';
import {OrderRequest} from "../../../shared/models/order.model";
import {HttpClient} from "@angular/common/http";
import {URI} from "../../../shared/constants/bainsight.strings";
import {firstValueFrom} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class OrderProcessingService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  placeOrder(orderRequest: OrderRequest) {
    firstValueFrom(this.http.post(URI.concat("/order"), orderRequest, {withCredentials: true}))
      .then(value => {
        this.toastr.success("Order has been placed successfully!")
      })
      .catch(reason => {
        this.toastr.error(reason.error.message);
      });
  }

  async cancelOrder(orderId: string){
    return firstValueFrom(this.http.put<void>(URI.concat(`/order/${orderId}`), {}, {withCredentials:true}));
  }


}
