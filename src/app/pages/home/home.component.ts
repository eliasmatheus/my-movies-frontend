import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { MoviePreview } from 'src/app/@shared/models/movie';
import { MoviesService } from 'src/app/@shared/services/movies.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  movies: MoviePreview[] = [];

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private service: MoviesService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.route.queryParams.subscribe(params => {
      const query = params['query'];

      if (query) {
        this.searchMovie(query);

        return;
      }

      this.getTopMovies();
    });
  }

  getTopMovies() {
    this.loading = true;

    this.subs.sink = this.service.getTopMovies().subscribe({
      next: data => {
        this.loading = false;

        this.movies = data.movies;
      },
      error: () => {
        this.loading = false;

        this.toastService.error('Error', 'Something went wrong');
      },
    });
  }

  searchMovie(query: string) {
    this.loading = true;

    this.subs.sink = this.service.searchMovies(query).subscribe({
      next: data => {
        this.loading = false;

        this.movies = data.Search;
      },
      error: err => {
        this.loading = false;

        if (err.status === 404) {
          this.movies = [];

          return;
        }

        this.toastService.error('Error', 'Something went wrong');
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
