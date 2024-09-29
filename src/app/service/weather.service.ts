import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../interface/weather';
import { WeatherData } from '../interface/weather-data';
import { environment } from '../../environments/environment.development';
import { Forecast } from '../interface/forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url : string = environment.baseUrl + '/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  testApi: string = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=' + environment.apiKey;

  public test() : Observable<WeatherData>{
    return this.http.get<WeatherData>(this.testApi);
  }

  public testIcon(iconId:string) : Observable<string>{
    var urlIcon = 'https://openweathermap.org/img/wn/'+ iconId +'@2x.png';
    return this.http.get<string>(urlIcon);
  }

  //real

  public getWeatherInfoByLonAndLat(lon : number, lat : number) : Observable<Forecast>{
    var params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('apiKey', environment.apiKey); 

    return this.http.get<Forecast>(this.url, {params});
  }
  
}
