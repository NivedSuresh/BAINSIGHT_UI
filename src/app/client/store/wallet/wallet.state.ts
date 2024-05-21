import {Page} from "../../../shared/models/watchlist.model";

export type TransactionDto = {
  id: number,
  walletTransactionType: "CREDIT" | "DEBIT",
  amount: number
  timestamp: Date
}


export type PagedTransactions = {
  transactions: TransactionDto[],
  page: Page
}


export type WalletStateType = {
  withdrawableBalance: number | null,
  currentBalance: number | null,
  transactions: PagedTransactions
}

export const walletState : WalletStateType = {
  withdrawableBalance: null,
  currentBalance: null,
  transactions: {page: {page: 0, next: false, prev:false}, transactions: []}
}
