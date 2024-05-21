import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {walletStore} from "../../store/wallet/wallet.store";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {DatePipe, JsonPipe, NgIf, NgStyle} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {Page} from "../../../shared/models/watchlist.model";

@Component({
  selector: 'wallet',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    JsonPipe,
    MatButton,
    MatCardContent,
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
    NgStyle
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit{


  walletStore = inject(walletStore);
  availableBalance  = computed(() => this.walletStore.currentBalance());
  withdrawableBalance = computed(() => this.walletStore.withdrawableBalance());
  transactions = computed(() => this.walletStore.transactions())
  page: Signal<Page> = computed(() => this.transactions().page);
  displayedColumns: string[] = ['ID', 'Transaction Type', 'Amount', 'Timestamp'];


  constructor() {
  }

  ngOnInit(): void {
    this.walletStore.fetchWalletAndTransactionsOnInit().then();
  }

  fetchPage(page: number) {
    this.walletStore.fetchPage(page).then();
  }
}
