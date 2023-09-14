import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/@shared/services/movies.service';
import { MoviePreview } from 'src/app/@shared/models/movie';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  movies: MoviePreview[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: MoviesService,
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
    this.subs.sink = this.service.getTopMovies().subscribe({
      next: data => {
        this.movies = data.movies;
        console.log('this.service.getTop100 -> data:', data);
      },
      error: err => {
        console.log('this.service.getTop100 -> err:', err);
      },
    });
  }

  searchMovie(query: string) {
    this.subs.sink = this.service.searchMovies(query).subscribe({
      next: data => {
        this.movies = data.Search;
        console.log('this.service.searchMovies -> data:', data);
      },
      error: err => {
        console.log('this.service.searchMovies -> err:', err);

        if (err.status === 404) {
          this.movies = [];
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
