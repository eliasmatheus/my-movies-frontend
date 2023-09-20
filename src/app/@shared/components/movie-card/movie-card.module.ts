import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BadgeComponent } from '../ui/badge/badge.component';
import { ButtonComponent } from '../ui/button/button.component';
import { MovieCardComponent } from './movie-card.component';

const COMPONENTS = [BadgeComponent, ButtonComponent];

@NgModule({
  declarations: [MovieCardComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, ...COMPONENTS],
  exports: [MovieCardComponent],
})
export class MovieCardModule {}
