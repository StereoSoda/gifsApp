import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private myApiKeyGIPHY: string = 'uqD6VQgd4MUFd5ZboYk476kK65rgKMWG';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient ) {}
  
  searchGifs( query: string ) {
    
    query = query.trim().toLowerCase();

    if( !this._history.includes( query ) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=uqD6VQgd4MUFd5ZboYk476kK65rgKMWG&q=${query}s&limit=10`)
    .subscribe((response ) => {
        this.results = response.data;
        console.log(response.data);
      })

  }
}
