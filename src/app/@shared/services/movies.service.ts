import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MovieSearchResponse, TopMoviesResponse } from '../models/movie';

interface MoviesCache {
  [key: string]: MovieSearchResponse;
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
   *
   * @returns
   */
  getTopMovies(): Observable<TopMoviesResponse> {
    return this.httpClient.get<TopMoviesResponse>(`${this.api}/top100`);
  }

  /**
   * Efetua uma busca de filmes pelo título
   * @param title - Título do filme
   */
  searchMovies(title: string) {
    return this.httpClient.get<MovieSearchResponse>(`${this.api}/movies`, {
      params: { s: title },
    });
  }

  /**
   * Busca um filme pelo ID
   *
   * @param id - iMDB ID do filme
   */
  getMovieById(id: string): Observable<MovieSearchResponse> {
    // Se o filme já estiver no cache, retorna um observable com o valor do cache
    if (this.moviesCache[id]) {
      return new Observable<MovieSearchResponse>(observer => {
        observer.next(this.moviesCache[id]);
        observer.complete();
      });
    }

    return (
      this.httpClient
        .get<MovieSearchResponse>(`${this.api}/movies/${id}`)
        // tap é um operador do rxjs que permite executar uma ação sem alterar o fluxo de dados
        .pipe(tap(data => (this.moviesCache[id] = data)))
    );
  }
}
