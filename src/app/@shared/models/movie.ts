export interface TopMoviesResponse {
  movies: MoviePreview[];
}
export interface MoviePreview {
  Poster: string | 'N/A';
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  Runtime?: string;
}

export interface MovieSearchResponse {
  Response: string;
  Search: MoviePreview[];
  totalResults: string;
}
