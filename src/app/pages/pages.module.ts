import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MenuModule } from '@shared/components/menu/menu.module';
import { MovieCardModule } from '@shared/components/movie-card/movie-card.module';
import { AlertComponent } from '@shared/components/ui/alert/alert.component';
import { ButtonComponent } from '@shared/components/ui/button/button.component';
import { DeleteDialogComponent } from '@shared/components/ui/delete-dialog/delete-dialog.component';
import { SpinnerComponent } from '@shared/components/ui/spinner/spinner.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { LayoutsModule } from '@shared/layouts/layouts.module';
import { ToastModule } from 'primeng/toast';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const COMPONENTS = [
  LayoutsModule,
  MenuModule,
  MovieCardModule,
  ButtonComponent,
  SpinnerComponent,
  AlertComponent,
  DirectivesModule,
  DeleteDialogComponent,
];

@NgModule({
  declarations: [PagesComponent, HomeComponent, WatchlistComponent],
  imports: [CommonModule, PagesRoutingModule, MatIconModule, ToastModule, ...COMPONENTS],
})
export class PagesModule {}
