import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneColumnLayoutComponent } from './one-column.layout';
import { HeaderModule } from '../components/header/header.module';
import { MovieSearchModule } from '../components/movie-search/movie-search.module';

const COMPONENTS = [HeaderModule, MovieSearchModule];

@NgModule({
  declarations: [OneColumnLayoutComponent],
  imports: [CommonModule, ...COMPONENTS],
  exports: [OneColumnLayoutComponent],
})
export class LayoutsModule {}
