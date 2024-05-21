import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {portfolioStore} from "../../store/portfolio/portfolio.store";
import {PortfolioSymbol} from "../../../shared/models/portfolio-symbol.model";
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
import {JsonPipe, NgIf} from "@angular/common";
import {Page} from "../../../shared/models/watchlist.model";
import {MatButton} from "@angular/material/button";
import {PlaceOrderComponent} from "../place-order/place-order.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'portfolio',
  standalone: true,
  imports: [
    MatCard,
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
    JsonPipe,
    MatButton,
    MatCardHeader
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit{

  protected portfolioStore = inject(portfolioStore);
  portfolioSymbols: Signal<PortfolioSymbol[]> = computed(() => this.portfolioStore.portfolioSymbols());
  pageable: Signal<Page> = computed(() => this.portfolioStore.page());
  displayedColumns: string[] = ["Symbol", "Invested Amount", "Sold Amount", "Quantity", "Open Quantity", "Sell"];

  constructor(
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.portfolioStore.fetchPortfolioSymbols(1).then();
  }


  fetchPage(page: number) {
    this.portfolioStore.fetchPortfolioSymbols(page).then();
  }

  sellSymbol(symbol :string) {
    this.matDialog.open(PlaceOrderComponent,
      {data: {symbol: symbol, transactionType: 'ASK'}}
    );
  }

  routeToHistory(symbol: string) {
    this.router.navigateByUrl(`history/${symbol}/1d`).then();
  }
}
