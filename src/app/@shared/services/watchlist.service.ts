import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  AddMovieToWatchlist,
  CreateWatchlist,
  MoviesWatchlist,
  WatchlistsResponse,
} from '../models/watchlist';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private api = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getWatchlist() {
    return this.httpClient.get<WatchlistsResponse>(`${this.api}/watchlist`);
  }

  saveWatchlist(data: CreateWatchlist) {
    return this.httpClient.post<any>(`${this.api}/watchlist`, data);
  }

  saveMovieToWatchlist(body: AddMovieToWatchlist) {
    const formData = new FormData();
    formData.append('imdb_id', body.imdb_id);
    body.watchlist_ids.forEach(watchlist_id => {
      formData.append('watchlist_ids', watchlist_id.toString());
    });

    return this.httpClient.post<any>(`${this.api}/watchlist/movie`, formData);
  }

  getMovieWatchlists(id: string) {
    return this.httpClient.get<MoviesWatchlist>(`${this.api}/watchlist/movie/${id}`);
  }
}
