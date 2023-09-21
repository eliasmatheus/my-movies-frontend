import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../@shared/services/watchlist.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  menuItems = MENU_ITEMS;

  constructor(private watchListService: WatchlistService) {}

  ngOnInit() {
    this.getWatchlists();

    this.watchListService.reloadWatchlists.subscribe(() => {
      this.getWatchlists();
    });
  }

  private getWatchlists() {
    this.watchListService.getWatchlists().subscribe({
      next: data => {
        const watchlistMenuItem = this.menuItems.find(
          item => item.title === 'Watchlists',
        );

        if (!watchlistMenuItem) return;

        watchlistMenuItem.children = data.watchlists.map(watchlist => ({
          title: watchlist.name,
          link: `/pages/watchlist/${watchlist.id}`,
        }));

        watchlistMenuItem.badge = data.watchlists.length;
      },
      error: err => {
        console.log('this.watchListService.getWatchList -> err:', err);
      },
    });
  }
}
