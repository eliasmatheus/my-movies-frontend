import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MovieSearchModule } from '../movie-search/movie-search.module';
import { ButtonComponent } from '../ui/button/button.component';
import { HeaderComponent } from './header.component';
import { ThemeToggleButtonComponent } from './theme-toggle-button/theme-toggle-button.component';
import { UserComponent } from './user/user.component';

const COMPONENTS = [UserComponent, ButtonComponent];

@NgModule({
  declarations: [HeaderComponent, ThemeToggleButtonComponent],
  imports: [CommonModule, RouterModule, MovieSearchModule, MatIconModule, ...COMPONENTS],
  exports: [HeaderComponent],
})
export class HeaderModule {}
