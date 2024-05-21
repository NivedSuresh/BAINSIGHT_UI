import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {orderStore} from "../../store/order/order.store";
import {Order, OrderStateType} from "../../store/order/order.state";
import {Page} from "../../../shared/models/watchlist.model";
import {DatePipe, JsonPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {Router, RouterLink} from "@angular/router";
import {elementAt} from "rxjs";

@Component({
  selector: 'order',
  standalone: true,
  imports: [
    JsonPipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    NgIf,
    MatHeaderCellDef,
    DatePipe,
    RouterLink
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{

  orderStore = inject(orderStore);
  orders: Signal<Order[]> = computed(() => this.orderStore.orders());
  page: Signal<Page> = computed(() => this.orderStore.page());

  displayedColumns: string[] = [
    // "Order Id",
    "Symbol",
    "Transaction Type",
    "Order Type",
    "Quantity Requested",
    "Quantity Matched",
    "Price Requested For",
    "Total Amount Spent",
    // "Order Placed At",
    "Last Updated At",
    "Order Status",
    "Exchange",
    "Cancel"
  ]


  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.orderStore.updateOrderState(1).then();
  }


  fetchPage(number: number) {
    this.orderStore.updateOrderState(number).then();
  }

  cancelOrder(orderId: string) {
    this.orderStore.cancelOrder(orderId).then();
  }
  routeToHistory(symbol: string) {
    this.router.navigateByUrl(`history/${symbol}/1d`).then();
  }
}
