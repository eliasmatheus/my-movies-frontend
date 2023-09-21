import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import type { PopoverInterface, PopoverOptions } from 'flowbite';
import { Popover } from 'flowbite';

import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '@shared/services/toast.service';
import { SubSink } from 'subsink';
import { MovieData } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { AddToWatchlistModalComponent } from '../add-to-watchlist-modal/add-to-watchlist-modal.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent implements AfterViewInit, OnDestroy {
  private subs = new SubSink();

  @Input({ required: true }) movie: MovieData;
  @Input() removable = false;

  @Output() remove = new EventEmitter<string>();

  popover: PopoverInterface | null = null;

  imgPlaceholder = '/assets/images/movie-poster-placeholder.svg';

  showOptions = false;

  constructor(
    public dialog: MatDialog,
    private toastService: ToastService,
    private moviesService: MoviesService,
  ) {}

  ngAfterViewInit(): void {
    // set the popover content element
    const targetEl = document.getElementById(`popoverTarget-${this.movie.imdbID}`);

    // set the element that trigger the popover using hover or click
    const triggerEl = document.getElementById(`popoverTrigger-${this.movie.imdbID}`);

    const options: PopoverOptions = {
      triggerType: 'hover',
      offset: -50,
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
      error: () => {
        this.toastService.error('Error', 'Something went wrong');
      },
    });
  }

  openDialog(): void {
    this.dialog.open(AddToWatchlistModalComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '400px',
      data: {
        id: this.movie.imdbID,
      },
      panelClass: 'transparent-dialog',
    });
  }

  onRemove() {
    this.remove.emit(this.movie.imdbID);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
