import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const MAT_MODULES = [MatIconModule];

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, RouterModule, ...MAT_MODULES],
  exports: [MenuComponent],
})
export class MenuModule {}
