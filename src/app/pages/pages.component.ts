import { Component, OnInit } from '@angular/core';
import { Menu } from '@shared/models/menu';
import { WatchlistsResponse } from '@shared/models/watchlist';
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
        this.addWatchlistsToMenu(data);
      },
      error: () => {
        this.toastService.error('Error', 'Something went wrong');
      },
    });
  }

  addWatchlistsToMenu(data: WatchlistsResponse) {
    const watchlistMenuItem = cloneDeep(this.watchlistMenuItem);

    watchlistMenuItem.children = [];

    watchlistMenuItem.children = data.watchlists.map(watchlist => ({
      title: watchlist.name,
      link: `/pages/watchlist/${watchlist.id}`,
    }));

    watchlistMenuItem.badge = data.watchlists.length;

    const watchlistPresent = this.menuItems.find(item => item.title === 'Watchlists');

    if (!watchlistPresent) {
      this.menuItems.push(watchlistMenuItem);

      return;
    }

    this.menuItems = this.menuItems.map(item => {
      if (item.title === 'Watchlists') {
        return watchlistMenuItem;
      }

      return item;
    });
  }
}
