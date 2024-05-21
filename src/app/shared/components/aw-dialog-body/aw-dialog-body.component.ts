import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {watchlistStore} from "../../../client/store/home/watchlist.store";

@Component({
  selector: 'aw-dialog-body',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './aw-dialog-body.component.html',
  styleUrl: './aw-dialog-body.component.css'
})
export class AwDialogBodyComponent {

  private watchlistStore;

  constructor() {
    this.watchlistStore = inject(watchlistStore);
  }

  symbol: string = '';

  onAdd() {
    this.watchlistStore.addToWatchlist(this.symbol);
    this.symbol = '';
  }
}
