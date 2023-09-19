import { Component, OnInit } from '@angular/core';
import { WatchListService } from '../@shared/services/watch-list.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  menuItems = MENU_ITEMS;

  constructor(private watchListService: WatchListService) {}

  ngOnInit() {
    this.watchListService.getWatchList().subscribe({
      next: data => {
        console.log('this.watchListService.getWatchList -> data:', data);
      },
      error: err => {
        console.log('this.watchListService.getWatchList -> err:', err);
      },
    });
  }
}
