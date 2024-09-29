import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interface/city';
import { environment } from '../../environments/environment.development';
import { SearchService } from '../interface/SearchService';

@Injectable({
  providedIn: 'root'
})
export class CityService implements SearchService<City[]>{

  private queryParam : string = environment.baseUrl + '/geo/1.0/direct';

  private limit : number = 5;

  constructor(private httpClient : HttpClient) {
  }

  public searchResult(search : string): Observable<City[]> {
    console.log("Search started", search)
    return this.getCityByName(search);
  }

  public getCityByName(cityName : string) : Observable<City[]> { // da izbaci grad na koje je user ukuco direktno ili kad sa search izbaci par pa klikne taj da izvuce interface
    console.log("Get city by name");
    const params = new HttpParams().set("q", cityName).set('limit', this.limit).set('apiKey', environment.apiKey);
    return this.httpClient.get<City[]>(this.queryParam, {params});
  }

  

}
