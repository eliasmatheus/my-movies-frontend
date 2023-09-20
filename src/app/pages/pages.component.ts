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
    this.watchListService.getWatchlist().subscribe({
      next: data => {
        console.log('this.watchListService.getWatchList -> data:', data);
      },
      error: err => {
        console.log('this.watchListService.getWatchList -> err:', err);
      },
    });
  }
}
