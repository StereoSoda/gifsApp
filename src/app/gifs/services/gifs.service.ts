import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public results: Gif[] = [];
  private _history: string[] = [];
  private URL: string = 'https://api.giphy.com/v1/gifs';
  private myApiKeyGIPHY: string = 'uqD6VQgd4MUFd5ZboYk476kK65rgKMWG';

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient ) {
    if( localStorage.getItem('history') ){
      this._history = JSON.parse( localStorage.getItem('history')! );
    }
    if( localStorage.getItem('results') ){
      this.results = JSON.parse( localStorage.getItem('results')! );
    }
  }
  
  searchGifs( query: string ) {
    
    query = query.trim().toLowerCase();

    if( !this._history.includes( query ) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0,10);

      localStorage.setItem( 'history', JSON.stringify(this._history) );
    }

    const params = new HttpParams()
      .set('api_key', this.myApiKeyGIPHY)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.URL }/search`, { params })
    .subscribe((response ) => {
      this.results = response.data;
      localStorage.setItem( 'results', JSON.stringify(this.results) );
    })
  }
}
