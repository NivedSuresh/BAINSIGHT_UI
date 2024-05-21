import {Component, computed, Inject, OnInit, Signal, WritableSignal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute} from "@angular/router";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {CandleStick, ExchangePrice} from "../../../shared/models/candlestick.model";
import {HistoryService} from "../../services/history/history.service";
import {JsonPipe} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {OrderRequest} from "../../../shared/models/order.model";
import {OrderProcessingService} from "../../services/order-processing/order-processing.service";

@Component({
  selector: 'place-order',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCardTitle,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatRadioGroup,
    MatRadioButton,
    JsonPipe,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    MatDialogClose
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit {


  protected stick!: CandleStick;
  protected readonly orderTypes = ['MARKET', 'LIMIT'] as const;
  protected orderForm!: FormGroup;


  constructor(private route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: { symbol: string, transactionType: string },
              protected historyService: HistoryService,
              private toastr: ToastrService,
              private orderProcessingService: OrderProcessingService) {

    this.orderForm = new FormGroup({
      symbol: new FormControl(this.data.symbol, Validators.required),
      price: new FormControl(0, [Validators.required]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100000)]),
      orderType: new FormControl('', [Validators.required,  Validators.pattern(/^(ORDER_TYPE_MARKET|ORDER_TYPE_LIMIT)$/)]),
      transactionType: new FormControl(this.data.transactionType, Validators.pattern(/^(ASK|BID)$/)),
      exchange: new FormControl('', [Validators.required, Validators.pattern(/^(NSE|BSE)$/)])
    });


  }

  ngOnInit(): void {
    this.historyService.getStickFromServer(this.data.symbol);
  }


  placeOrder() {


    /* TODO: UNCOMMENT */

    // const date = new Date();
    // if(date.getHours() > 15 || date.getHours() < 9 ||
    //   (date.getHours() == 15 && date.getMinutes() > 30) ||
    //   date.getDay() == 0) {
    //   this.toastr.error("Market is closed!")
    //   return;
    // }


    const min = this.minPrice;
    const max = this.maxPrice;
    if(this.orderForm.value.price < min || this.orderForm.value.price > max){
      this.toastr.error(`The price for the order should fall between ₹${min} - ₹${max}.`);
      return;
    }

    const orderRequest: OrderRequest = this.orderForm.getRawValue();
    this.orderProcessingService.placeOrder(orderRequest);

  }

  get minPrice() {
    return Math.round(this.orderForm.getRawValue()?.orderType === 'ORDER_TYPE_LIMIT' ? (this.historyService.getStick?.low * 0.8 || 1) : 0);
  }

  get maxPrice(){
    return Math.round(this.orderForm.getRawValue()?.orderType === 'ORDER_TYPE_LIMIT' ? (this.historyService.getStick?.high * 1.2 || 1) : 0);
  }
}
