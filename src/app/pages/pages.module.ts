import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LayoutsModule } from '../@shared/layouts/layouts.module';
import { MenuModule } from '../@shared/components/menu/menu.module';
import { HomeComponent } from './home/home.component';
import { MovieCardModule } from '../@shared/components/movie-card/movie-card.module';

const COMPONENTS = [LayoutsModule, MenuModule, MovieCardModule];

@NgModule({
  declarations: [PagesComponent, HomeComponent],
  imports: [CommonModule, PagesRoutingModule, ...COMPONENTS],
})
export class PagesModule {}
