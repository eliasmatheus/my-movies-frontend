import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Popover } from 'flowbite';
import type { PopoverOptions, PopoverInterface } from 'flowbite';

import { MoviePreview } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements AfterViewInit, OnDestroy {
  private subs = new SubSink();

  @Input({ required: true }) movie: MoviePreview;

  popover: PopoverInterface | null = null;

  imgPlaceholder = '/assets/images/movie-poster-placeholder.svg';

  constructor(private moviesService: MoviesService) {}

  ngAfterViewInit(): void {
    // set the popover content element
    const targetEl = document.getElementById(`popoverTarget-${this.movie.imdbID}`);

    // set the element that trigger the popover using hover or click
    const triggerEl = document.getElementById(`popoverTrigger-${this.movie.imdbID}`);

    const options: PopoverOptions = {
      placement: 'right',
      triggerType: 'hover',
    };

    if (!targetEl || !triggerEl) return;

    this.popover = new Popover(targetEl, triggerEl, options);
  }

  onHover() {
    if (!this.popover) return;

    this.getMovieById();
  }

  onMouseLeave() {
    if (!this.popover) return;

    this.popover.hide();
  }

  getMovieById() {
    this.subs.sink = this.moviesService.getMovieById(this.movie.imdbID).subscribe({
      next: data => {
        console.log('this.moviesService.getMovieById -> data:', data);

        if (!this.popover) return;

        this.popover.show();
      },
      error: err => {
        console.log('this.moviesService.getMovieById -> err:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
