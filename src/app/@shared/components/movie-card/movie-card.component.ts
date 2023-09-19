import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import type { PopoverInterface, PopoverOptions } from 'flowbite';
import { Popover } from 'flowbite';

import { SubSink } from 'subsink';
import { MovieData } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent implements AfterViewInit, OnDestroy {
  private subs = new SubSink();

  @Input({ required: true }) movie: MovieData;

  popover: PopoverInterface | null = null;

  imgPlaceholder = '/assets/images/movie-poster-placeholder.svg';

  showOptions = false;

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
    this.showOptions = true;
    if (!this.popover) return;

    if (!this.movie.Plot) {
      this.getMovieById();

      return;
    }

    this.popover.show();
  }

  onMouseLeave() {
    this.showOptions = false;

    if (!this.popover) return;

    this.popover.hide();
  }

  getMovieById() {
    this.subs.sink = this.moviesService.getMovieById(this.movie.imdbID).subscribe({
      next: data => {
        this.movie = data;

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
