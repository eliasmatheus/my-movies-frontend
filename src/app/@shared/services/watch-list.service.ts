import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  private api = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getWatchList() {
    return this.httpClient.get(`${this.api}/watchlist`);
  }
}
