import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SubSink } from 'subsink';
import { Watchlist } from '../../models/watchlist';
import { ToastService } from '../../services/toast.service';
import { WatchlistService } from '../../services/watchlist.service';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { WatchlistModalComponent } from '../watchlist-modal/watchlist-modal.component';

interface ExtendedWatchlist extends Watchlist {
  selected?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-add-to-watchlist-modal',
  standalone: true,
  templateUrl: './add-to-watchlist-modal.component.html',
  imports: [
    CommonModule,
    ModalComponent,
    ButtonComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AddToWatchlistModalComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  watchlists: ExtendedWatchlist[] = [];

  loading = {
    watchlists: false,
    save: false,
    movieWatchlists: false,
  };

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddToWatchlistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },

    private toastService: ToastService,
    private watchListService: WatchlistService,
  ) {}

  ngOnInit(): void {
    this.getWatchlists();
  }

  getWatchlists() {
    this.loading.watchlists = false;

    this.watchListService.getWatchlists().subscribe({
      next: data => {
        this.loading.watchlists = false;

        this.watchlists = data.watchlists;

        this.getMovieWatchlists();
      },
      error: err => {
        this.loading.watchlists = false;
      },
    });
  }

  getMovieWatchlists() {
    this.loading.movieWatchlists = false;

    this.watchListService.getMovieWatchlists(this.data.id).subscribe({
      next: data => {
        this.loading.movieWatchlists = false;
        console.log('this.watchListService.getWatchList -> data:', data);

        this.watchlists = this.watchlists.map(watchlist => {
          const found = data.watchlists.find(
            movieWatchlist => movieWatchlist === watchlist.id,
          );

          console.log('this.watchListService.getMovieWatchlists -> found:', found);

          if (found) {
            return {
              ...watchlist,
              selected: true,
              disabled: true,
            };
          }

          return watchlist;
        });
      },
      error: err => {
        this.loading.movieWatchlists = false;
      },
    });
  }

  onSubmit() {
    if (this.watchlists.length === 0) return;

    const selectedWatchlists = this.watchlists.filter(watchlist => watchlist.selected);
    const body = {
      imdb_id: this.data.id,
      watchlist_ids: selectedWatchlists.map(watchlist => watchlist.id),
    };

    this.loading.save = false;

    this.subs.sink = this.watchListService.saveMovieToWatchlist(body).subscribe({
      next: () => {
        this.loading.save = false;

        this.toastService.success('Movie added to watchlist');

        this.dialogRef.close();
      },
      error: err => {
        this.loading.save = false;

        this.toastService.error('Error adding movie to watchlist');
        this.toastService.error(err.error.message);
      },
    });
  }

  openWatchlistModal(): void {
    const dialogRef = this.dialog.open(WatchlistModalComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '400px',
      panelClass: 'transparent-dialog',
    });

    this.subs.sink = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getWatchlists();
      }
    });
  }

  disableSaveButton() {
    return (
      this.watchlists.filter(watchlist => watchlist.selected && !watchlist.disabled)
        .length === 0
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
