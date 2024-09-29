import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interface/city';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private queryParam : string = environment.baseUrl + '/geo/1.0/direct';

  private limit : number = 5;

  constructor(private httpClient : HttpClient) {
  }

  public getCityByName(cityName : string) : Observable<City[]> { // da izbaci grad na koje je user ukuco direktno ili kad sa search izbaci par pa klikne taj da izvuce interface
    const params = new HttpParams().set("q", cityName).set('limit', this.limit).set('apiKey', environment.apiKey);
    return this.httpClient.get<City[]>(this.queryParam, {params});
  }

}
