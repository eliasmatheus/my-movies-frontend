export interface TopMoviesResponse {
  movies: FullMovieData[];
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

export interface FullMovieData {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings?: RatingsEntity[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export type MovieData = Partial<FullMovieData> & MoviePreview;

export interface RatingsEntity {
  Source: string;
  Value: string;
}
