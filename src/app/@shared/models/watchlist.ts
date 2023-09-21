import { MoviePreview } from './movie';

export interface WatchlistsResponse {
  watchlists: Watchlist[];
}

export interface PostWatchlist {
  id?: number;
  name: string;
  description?: string;
}

export interface Watchlist {
  id: number;
  name: string;
  movies: string[];
  description?: string;
}

export interface AddMovieToWatchlist {
  watchlist_ids: number[];
  imdb_id: string;
}

export interface MoviesWatchlist {
  watchlists: number[];
  imdb_id: string;
}

export interface WatchlistDetails {
  id: number;
  name: string;
  movies: MoviePreview[];
  description?: string;
}
