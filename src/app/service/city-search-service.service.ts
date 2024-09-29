import { Injectable } from '@angular/core';
import { SearchService } from '../interface/SearchService';
import { City } from '../interface/city';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CitySearchServiceService implements SearchService<City[]>{

  private queryParam : string = environment.baseUrl + '/geo/1.0/direct';

  constructor(private httpClient : HttpClient) {
  }

  searchResult(search : string): City[] {
    console.log("City search", search);
    if (search == 't') {
      return [];
    }
    return [{country:"", lat:1, lon:1, name:"", state:""}];
  }

}
