import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSearchComponent } from './movie-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MovieSearchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MovieSearchComponent],
})
export class MovieSearchModule {}
