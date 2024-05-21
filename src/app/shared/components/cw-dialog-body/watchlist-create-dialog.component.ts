import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {watchlistStore} from "../../../client/store/home/watchlist.store";
import {StompService} from "../../stomp/stomp.service";

@Component({
  selector: 'mat-dialog-body',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    FormsModule
  ],
  templateUrl: './watchlist-create-dialog.component.html',
  styleUrl: './watchlist-create-dialog.component.css'
})
export class WatchlistCreateDialog {

  name: string;
  watchlistStore;


  constructor(
    private stompService: StompService
  )
  {
    this.name = '';
    this.watchlistStore = inject(watchlistStore);
  }


  /* TODO: HANDLE SUB-UNSUB FROM STOMP */
  onSave() {
    // this.watchlistStore.
    this.watchlistStore.createWatchlist(this.name);
    this.name = '';
  }
}
