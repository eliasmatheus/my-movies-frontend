import { Component, OnInit } from '@angular/core';
import { Menu } from '@shared/models/menu';
import { ToastService } from '@shared/services/toast.service';
import { WatchlistService } from '@shared/services/watchlist.service';
import { cloneDeep } from 'lodash';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  menuItems = MENU_ITEMS;

  watchlistMenuItem: Menu = {
    title: 'Watchlists',
    icon: 'list',
    link: '/pages/watchlist',
    children: [],
  };

  constructor(
    private toastService: ToastService,
    private watchListService: WatchlistService,
  ) {}

  ngOnInit() {
    this.getWatchlists();

    this.watchListService.reloadWatchlists.subscribe(() => {
      this.getWatchlists();
    });
  }

  private getWatchlists() {
    this.watchListService.getWatchlists().subscribe({
      next: data => {
        const watchlistMenuItem = cloneDeep(this.watchlistMenuItem);

        watchlistMenuItem.children = [];

        watchlistMenuItem.children = data.watchlists.map(watchlist => ({
          title: watchlist.name,
          link: `/pages/watchlist/${watchlist.id}`,
        }));

        watchlistMenuItem.badge = data.watchlists.length;

        this.addWatchlistsToMenu(watchlistMenuItem);
      },
      error: () => {
        this.toastService.error('Error', 'Something went wrong');
      },
    });
  }

  private addWatchlistsToMenu(watchlistMenuItem: Menu) {
    const watchlistPresent = this.menuItems.find(item => item.title === 'Watchlists');

    if (watchlistPresent) {
      this.menuItems = this.menuItems.filter(item => item.title !== 'Watchlists');
    }

    if (watchlistMenuItem?.children?.length === 0) return;

    this.menuItems.push(watchlistMenuItem);
  }
}
