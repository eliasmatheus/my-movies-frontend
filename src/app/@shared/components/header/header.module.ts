import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { MovieSearchModule } from '../movie-search/movie-search.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, MovieSearchModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
