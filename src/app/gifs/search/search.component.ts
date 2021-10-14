import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  
  constructor(private gisfsService: GifsService) {}

  search = () => {

    const val = this.txtSearch.nativeElement.value;

    if(val.trim().length === 0){
      return;
    }else{
      this.gisfsService.searchGifs(val);
    }

  }

}
