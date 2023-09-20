import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SubSink } from 'subsink';
import { Watchlist } from '../../models/watchlist';
import { WatchlistService } from '../../services/watchlist.service';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalComponent } from '../ui/modal/modal.component';

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
    public dialogRef: MatDialogRef<AddToWatchlistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },

    private watchListService: WatchlistService,
  ) {}

  ngOnInit(): void {
    this.getWatchlists();
  }

  getWatchlists() {
    this.loading.watchlists = false;

    this.watchListService.getWatchlist().subscribe({
      next: data => {
        this.loading.watchlists = false;
        console.log('this.watchListService.getWatchList -> data:', data);

        this.watchlists = data.watchlists;

        this.getMovieWatchlists();
      },
      error: err => {
        this.loading.watchlists = false;

        console.log('this.watchListService.getWatchList -> err:', err);
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

        console.log(
          'this.watchListService.getMovieWatchlists -> this.watchlists:',
          this.watchlists,
        );
      },
      error: err => {
        this.loading.movieWatchlists = false;

        console.log('this.watchListService.getWatchList -> err:', err);
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

        this.dialogRef.close();
      },
      error: err => {
        this.loading.save = false;

        console.log('this.watchListService.getWatchList -> err:', err);
      },
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
