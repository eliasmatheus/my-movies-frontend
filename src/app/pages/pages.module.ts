import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LayoutsModule } from '../@shared/layouts/layouts.module';
import { MenuModule } from '../@shared/components/menu/menu.module';

const COMPONENTS = [LayoutsModule, MenuModule];

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, PagesRoutingModule, ...COMPONENTS],
})
export class PagesModule {}
