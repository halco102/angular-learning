import { Component, OnInit } from '@angular/core';
import { City } from '../interface/city';
import { Forecast } from '../interface/forecast';
import { CityService } from '../service/city.service';
import { WeatherService } from '../service/weather.service';
import { CardComponent } from './ui-card/card.component';
import { WeatherData } from '../interface/weather-data';
import { SharedService } from '../service/shared.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  constructor(private weatherService : WeatherService, 
    private cityService : CityService,
    private searchEvent : SharedService) {}

  ngOnInit(): void {
    this.searchEvent.inputString$.subscribe((response) => {
      if (response.length > 0) {
        console.log("Event happened in search, start in other component something")
        this.searchOutputEmit(response);
      }
    })
  }

  public cityDtos: City[] = [];

  public forecast : Forecast = ({} as any) as Forecast; // to lazy to init the real way

  public selectedCity!: City;

  weatherData : WeatherData = ({} as any) as WeatherData;
  icon:string = '';

  public updateCityDtos(cities: City[]): void {
    console.log("Update city dto");
    this.cityDtos = cities;
  }

  public searchOutputEmit(input : string) : void {
    console.log("Event triggered in search component");
    this.cityService.searchResult(input).subscribe((response) => {
      console.log("Sub to the search and get response", response);
      this.updateCityDtos(response);
    });
  }

  public selectedCityByLonAndLat(lon : number, lat : number) : void {
    console.log("Selected", lat, lon)
    this.weatherService.getWeatherInfoByLonAndLat(lon, lat).subscribe((response) => {
      console.log("Res ", response);
      this.forecast = response;
    })
  }

  public protCity : City = ({} as City) as City;
  public cityProperties: (keyof typeof this.protCity)[] = ['name', 'country', 'state'];

  //emit
  public handleSelectedCityEmit(city : City) {
    console.log("Selected city", city.lat, city.lon)
    this.selectedCity = city;
    this.cityDtos = [];
  }
}
