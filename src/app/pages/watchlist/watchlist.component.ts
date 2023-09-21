import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DeleteDialogComponent } from '@shared/components/ui/delete-dialog/delete-dialog.component';
import { ToastService } from '@shared/services/toast.service';
import { WatchlistModalComponent } from 'src/app/@shared/components/watchlist-modal/watchlist-modal.component';
import { WatchlistDetails } from 'src/app/@shared/models/watchlist';
import { WatchlistService } from 'src/app/@shared/services/watchlist.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  watchlist: WatchlistDetails;

  loading = false;
  loadingDelete = false;

  constructor(
    router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private watchlistService: WatchlistService,
  ) {
    this.subs.sink = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getWatchlist();
      }
    });
  }

  ngOnInit(): void {
    this.getWatchlist();
  }

  getWatchlist() {
    const { id } = this.route.snapshot.params;

    this.loading = true;

    this.subs.sink = this.watchlistService.getWatchlist(Number(id)).subscribe({
      next: watchlist => {
        this.loading = false;

        this.watchlist = watchlist;
      },
      error: () => {
        this.loading = false;

        this.toastService.error('Error', 'Something went wrong');
      },
    });
  }

  openWatchlistModal(): void {
    const dialogRef = this.dialog.open(WatchlistModalComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '400px',
      data: this.watchlist,
      panelClass: 'transparent-dialog',
    });

    this.subs.sink = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getWatchlist();
      }
    });
  }

  onRemove(imdbID: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '400px',
      data: this.watchlist,
      panelClass: 'transparent-dialog',
    });

    this.subs.sink = dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteFromWatchlist(imdbID);
      }
    });
  }

  deleteFromWatchlist(imdbID: string) {
    this.loadingDelete = true;

    this.subs.sink = this.watchlistService
      .removeMovieFromWatchlist(this.watchlist.id, imdbID)
      .subscribe({
        next: watchlist => {
          this.loadingDelete = false;

          this.watchlist = watchlist;
        },
        error: () => {
          this.loadingDelete = false;

          this.toastService.error('Error', 'Something went wrong');
        },
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
