import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent {
  
  constructor(private gisfsService: GifsService) {}

  get historySearch(){
    return this.gisfsService.history;
  }

  searchHistory = (query: string) => {
    this.gisfsService.searchGifs(query);
  }
  
}