import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { WatchlistModalComponent } from '../watchlist-modal/watchlist-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  private subs = new SubSink();

  constructor(private dialog: MatDialog) {}

  openWatchlistModal(): void {
    this.dialog.open(WatchlistModalComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '400px',
      panelClass: 'transparent-dialog',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
