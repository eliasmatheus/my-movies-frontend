import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'movies',
        component: HomeComponent,
      },

      {
        path: 'watchlist',
        component: WatchlistComponent,
        pathMatch: 'full',
      },
      {
        path: 'watchlist/:id',
        component: WatchlistComponent,
      },

      {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
