import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  AddMovieToWatchlist,
  MoviesWatchlist,
  PostWatchlist,
  WatchlistDetails,
  WatchlistsResponse,
} from '../models/watchlist';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private api = environment.apiUrl;

  reloadWatchlists = new EventEmitter<void>();

  constructor(private httpClient: HttpClient) {}

  getWatchlists() {
    return this.httpClient.get<WatchlistsResponse>(`${this.api}/watchlist`);
  }

  getWatchlist(id: number) {
    return this.httpClient.get<WatchlistDetails>(`${this.api}/watchlist/${id}`);
  }

  saveWatchlist(data: PostWatchlist) {
    const formData = new FormData();
    formData.append('id', data.id?.toString() ?? '');
    formData.append('name', data.name);
    formData.append('description', data.description ?? '');

    const method = data.id ? 'put' : 'post';

    return this.httpClient[method]<WatchlistsResponse>(
      `${this.api}/watchlist`,
      formData,
    ).pipe(
      tap(() => {
        this.reloadWatchlists.emit();
      }),
    );
  }

  deleteWatchlist(id: number) {
    return this.httpClient.delete<WatchlistsResponse>(`${this.api}/watchlist/${id}`).pipe(
      tap(() => {
        this.reloadWatchlists.emit();
      }),
    );
  }

  saveMovieToWatchlist(body: AddMovieToWatchlist) {
    const formData = new FormData();
    formData.append('imdb_id', body.imdb_id);
    body.watchlist_ids.forEach(watchlist_id => {
      formData.append('watchlist_ids', watchlist_id.toString());
    });

    return this.httpClient.post<any>(`${this.api}/watchlist/movie`, formData);
  }

  removeMovieFromWatchlist(watchlist_id: number, imdb_id: string) {
    return this.httpClient.delete<any>(
      `${this.api}/watchlist/${watchlist_id}/movie/${imdb_id}`,
    );
  }

  getMovieWatchlists(id: string) {
    return this.httpClient.get<MoviesWatchlist>(`${this.api}/watchlist/movie/${id}`);
  }
}
