import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable, tap } from 'rxjs';
import { FullMovieData, MovieSearchResponse, TopMoviesResponse } from '../models/movie';

interface MoviesCache {
  [key: string]: FullMovieData;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private api = environment.apiUrl;

  /**
   * Armazena os filmes buscados por id para evitar requisições desnecessárias
   */
  private moviesCache: MoviesCache = {};

  constructor(private httpClient: HttpClient) {}

  /**
   * Busca os 100 filmes mais populares no iMDB
   */
  getTopMovies(): Observable<TopMoviesResponse> {
    return this.httpClient.get<TopMoviesResponse>(`${this.api}/top100`);
  }

  /**
   * Efetua uma busca de filmes pelo título
   */
  searchMovies(title: string) {
    return this.httpClient.get<MovieSearchResponse>(`${this.api}/movies`, {
      params: { s: title },
    });
  }

  /**
   * Busca um filme pelo ID
   */
  getMovieById(id: string): Observable<FullMovieData> {
    // Se o filme já estiver no cache, retorna um observable com o valor do cache
    if (this.moviesCache[id]) {
      return new Observable<FullMovieData>(observer => {
        observer.next(this.moviesCache[id]);
        observer.complete();
      });
    }

    return (
      this.httpClient
        .get<FullMovieData>(`${this.api}/movies/${id}`)
        // tap é um operador do rxjs que permite executar uma ação sem alterar o fluxo de dados
        .pipe(tap(data => (this.moviesCache[id] = data)))
    );
  }
}
