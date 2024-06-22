import {Component, computed, inject, OnDestroy, Signal} from '@angular/core';
import {watchlistStore} from "../../store/home/watchlist.store";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {CandleStick} from "../../../shared/models/candlestick.model";
import {WatchlistDto} from "../../../shared/models/watchlist.model";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {StompService} from "../../../shared/stomp/stomp.service";
import {rxStompServiceFactory} from "../../../shared/stomp/rx-stomp-service-factory";
import {MatDialog} from "@angular/material/dialog";
import {WatchlistCreateDialog} from "../../../shared/components/cw-dialog-body/watchlist-create-dialog.component";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatSelectionList} from "@angular/material/list";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {AwDialogBodyComponent} from "../../../shared/components/aw-dialog-body/aw-dialog-body.component";
import {HistoryService} from "../../services/history/history.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'watchlist',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgIf,
    NgForOf,
    MatAnchor,
    MatSelectionList,
    MatSelect,
    MatOption,
    MatLabel,
    MatFormField,
    FormsModule,
    MatInput,
    JsonPipe,
    MatIconButton,
    MatButton
  ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnDestroy{

  private stompService: StompService;
  watchlistDto: Signal<WatchlistDto>;
  watchlistStore = inject(watchlistStore);

  tags: Signal<string[]>;

  datasource: Signal<MatTableDataSource<CandleStick>>;
  displayedColumns: string[] = ['symbol', 'low', 'high', 'open', 'close', 'volume', 'change', 'action'];

  constructor(
    private matDialog: MatDialog,
    private historyService: HistoryService
  ) {
    this.stompService = rxStompServiceFactory();
    this.watchlistStore.fetchWatchlist(1, '').then(value => {});

    this.watchlistDto = computed(() => {
      const watchlistDto = this.watchlistStore.watchlistDto();
      this.stompService.unsubscribeAll();
      this.stompService.subscribeAll(watchlistDto.sticks);
      return watchlistDto;
    });
    this.datasource = computed(() => {
      return new MatTableDataSource<CandleStick>(this.watchlistDto().sticks)
    });
    this.tags = computed(() => this.watchlistStore.tags());
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }


  async fetchPage(page: number){
    await this.watchlistStore.fetchWatchlist(page, this.watchlistDto().watchlistName);
    this.stompService.unsubscribeAll();
  }


  onCreateWatchlist() {
    this.matDialog.open(
      WatchlistCreateDialog, {
        width: '20%'
    });
  }

  async switchWatchlist(tag: string) {
    await this.watchlistStore.fetchWatchlist(1, tag);
    this.stompService.unsubscribeAll();
  }

  onAddToWatchlist() {
    this.matDialog.open(
      AwDialogBodyComponent, {
        width: '20%'
      });
  }

  routeToHistory(symbol: string) {
    this.historyService.route(symbol, "1D");
  }


  private unsubscribeAll() {
    this.stompService.unsubscribeAll();
    this.watchlistStore.emptySticks();
  }

  async trashSymbol(symbol: string) {
    if(!symbol) return;
    await this.watchlistStore.removeSymbol(symbol);
  }





  async pinWatchlist() {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      html: '<span style="color: #fff;">Do you want to pin this watchlist? If pinned, this watchlist will be loaded on the home screen.</span>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2d2f2d',  // Custom color for confirm button (green)
      cancelButtonColor: '#2d2f2d',   // Custom color for cancel button (red)
      confirmButtonText: 'Yes, pin it!',
      customClass: {
        popup: 'swal2-popup',        // Custom class for popup (dialog)
        title: 'swal2-title'       // Custom class for title
      }
    });

    if (confirmed.isConfirmed) {
      try {
        await this.watchlistStore.pinWatchlist(); // Assuming this method performs the pin action
        await Swal.fire({
          icon: 'success',
          title: 'Pinned!',
          text: 'The watchlist has been pinned.',
          customClass: {
            popup: 'swal2-popup'  // Apply predefined class for popup (dialog)
          }
        });
        // Optionally, update component state or perform further actions after pinning
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to pin the watchlist.',
          customClass: {
            popup: 'swal2-popup'  // Apply predefined class for popup (dialog)
          }
        });
        console.error('Failed to pin watchlist:', error);
      }
    } else {
      return;
    }
  }

}
