import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Order, orderState} from "./order.state";
import {OrderPersistenceService} from "../../services/order-persistance/order-persistence.service";
import {OrderProcessingService} from "../../services/order-processing/order-processing.service";


export const orderStore =
  signalStore({providedIn : "root"},
    withState(orderState),

    withMethods((store,
                 orderPersistenceService = inject(OrderPersistenceService),
                 orderProcessing = inject(OrderProcessingService),
                 toastr: ToastrService = inject(ToastrService)) => ({


      async updateOrderState(page: number){
        try{
          const newState  = await orderPersistenceService.fetchOrders(page);
          console.log(newState);
          patchState(store, {orders: newState.orders, page: newState.page});
        }
        catch (err: any){ toastr.error(err.error.message); }
      },

      async cancelOrder(orderId: string){
        try{
          await orderProcessing.cancelOrder(orderId);

          const orders  = store.orders();

          for (let i = 0; i < orders.length; i++) {
            if (orders[i].orderId === orderId) {
              orders[i].orderStatus = 'CANCELLED';
              break;
          }}

          patchState(store, {orders: orders});
          toastr.warning("Order has been cancelled!");
        }
        catch (err: any) { toastr.error(err.error.message); }
      }

    })),
  )
