import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Forecast } from '../interface/forecast';
import { WeatherService } from '../service/weather.service';
import { map, Subscription } from 'rxjs';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.css'
})
export class WeatherInfoComponent implements OnInit, OnDestroy{
  
  constructor(private weatherService : WeatherService) {}

  private subscription! : Subscription;

  public forecast! : Forecast;
  public currentDateTime! : string;

  ngOnInit(): void {
    //da imam listener kada se promijeni dugme za F i C
    console.log("INIT")
    this.subscription = this.weatherService.forecast$.subscribe(res => {
      console.log("Weather component listener")
      if (res !== null) {
        this.forecast = res;
        this.currentDateTime = this.getTime();
      }
    })
  }

  ngOnDestroy(): void {
    console.log("Destroy Weather info component")
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTime() : string{
    //timeZone can be  "CST","GMT" ,"Asia/Jerusalem" , etc
    var d = new Date(new Date().toLocaleString("en-US", {timeZone: "UTC"}));
    var n = d.toLocaleString(); // just to get date & time
    return n;
  } 
}
