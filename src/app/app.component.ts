import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabComponent } from "./tab/tab.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { WeatherComponent } from "./weather/weather.component";
import { City } from './interface/city';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Weather } from './interface/weather';
import { WeatherService } from './service/weather.service';
import { Forecast } from './interface/forecast';
import { CitySearchServiceService } from './service/city-search-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabComponent, SearchBarComponent, SearchBarComponent, WeatherComponent, NgIf, NgFor, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'WeatherApp';

  constructor(private weatherService : WeatherService, public citySearchService:CitySearchServiceService) {}

  public cityDtos: City[] = [];

  public forecast : Forecast = ({} as any) as Forecast; // to lazy to init the real way

  public updateCityDtos(cities: City[]): void {
    this.cityDtos = cities;
  }

  public selectedCityByLonAndLat(lon : number, lat : number) : void {
    this.weatherService.getWeatherInfoByLonAndLat(lon, lat).subscribe((response) => {
      console.log("Res ", response);
      this.forecast = response;
    })
  }
}

