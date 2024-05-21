import {Page} from "../../../shared/models/watchlist.model";

export type Order = {
  orderId: string,
  symbol: string,
  exchange: string,
  transactionType: string
  orderType: string
  quantityRequested: number
  priceRequestedFor: number | null
  totalAmountSpent: number
  quantityMatched: number
  orderPlacedAt: Date
  lastUpdatedAt: Date,
  orderStatus: string
}


export type OrderStateType = {
  orders: Order[]
  page: Page
}


export const orderState: OrderStateType = {
  orders: [],
  page: {page: 1, next: false, prev:false}
}
