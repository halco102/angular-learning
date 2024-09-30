import { Component, OnDestroy, OnInit } from '@angular/core';
import { City } from '../interface/city';
import { Forecast } from '../interface/forecast';
import { CityService } from '../service/city.service';
import { WeatherService } from '../service/weather.service';
import { CardComponent } from './ui-card/card.component';
import { WeatherData } from '../interface/weather-data';
import { SharedService } from '../service/shared.service';
import { NgFor, NgIf } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, SearchBarComponent, WeatherInfoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy{

  constructor(private weatherService : WeatherService, 
    private cityService : CityService,
    private searchEvent : SharedService) {}

  ngOnDestroy(): void {
    console.log("DESTROY PARENT")
  }


  ngOnInit(): void {
    console.log("PARENT INIT");
    this.searchEvent.inputString$.subscribe((response) => {
      
      if (response !== undefined && response.id === 'searchEmit') {
        console.log("Event happened in search, start in other component something")
        this.searchOutputEmit(response.object);
      }
    })
  }

  private destroy$ = new Subject<void>();

  public cityDtos: City[] = [];

  public showForecast : boolean = false;

  public selectedCity!: City | undefined;

  private toogleMode = "";

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


      //when search is started, purge other objects
      this.showForecast = false;
      this.selectedCity = undefined;
    });
  }

  public selectedCityByLonAndLat(lon : number, lat : number) : void {
    console.log("Sub on search city event");

    this.destroy$.next();

    this.searchEvent.inputString$
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      if (response.id === 'toogleTemp') {
        console.log("Toogle");
        this.toogleMode = response.object;

        //update
        this.getCityWeatherInfo(lon, lat, this.toogleMode);
      }
    })

    console.log("ELSE")
    this.getCityWeatherInfo(lon, lat, this.toogleMode);
  }

  private getCityWeatherInfo(lon : number, lat : number, units : string) : Subscription {
    return this.weatherService.getWeatherInfoByLonAndLat(lat, lon, units).subscribe((response) => {
      this.showForecast = true;
      this.weatherService.setForecast(response); // will emit to every listener
      console.log(response);
    })
  }

  public protCity : City = ({} as City) as City;
  public cityProperties: (keyof typeof this.protCity)[] = ['name', 'country', 'state'];

  public propForecast : Forecast = ({} as Forecast) as Forecast;
  public propertiesForecast : (keyof typeof this.propForecast)[] = ['cnt', 'cod', 'message'];

  //emit
  public handleSelectedCityEmit(city : City) {
    console.log("Selected city", city.lat, city.lon, city.name)
    this.selectedCity = city;
    this.cityDtos = [];
  }
}
