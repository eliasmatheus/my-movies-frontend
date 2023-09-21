import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from '../@shared/components/menu/menu.module';
import { MovieCardModule } from '../@shared/components/movie-card/movie-card.module';
import { ButtonComponent } from '../@shared/components/ui/button/button.component';
import { LoaderComponent } from '../@shared/components/ui/loader/loader.component';
import { LayoutsModule } from '../@shared/layouts/layouts.module';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const COMPONENTS = [
  LayoutsModule,
  MenuModule,
  MovieCardModule,
  ButtonComponent,
  LoaderComponent,
];

@NgModule({
  declarations: [PagesComponent, HomeComponent, WatchlistComponent],
  imports: [CommonModule, PagesRoutingModule, MatIconModule, ToastModule, ...COMPONENTS],
})
export class PagesModule {}
