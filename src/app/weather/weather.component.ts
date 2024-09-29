import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { WeatherService } from '../service/weather.service';
import { HttpClientModule } from '@angular/common/http'; 
import { Weather } from '../interface/weather';
import { WeatherData } from '../interface/weather-data';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit{

  constructor(private weatherService: WeatherService) {}
  obj : WeatherData = ({} as any) as WeatherData;
  icon:string = '';

  ngOnInit(): void {
    this.weatherService.test().subscribe((response) => {
      this.obj = response;
      this.weatherService.testIcon(this.obj.weather[0].icon).subscribe((iconRes) => {
        this.icon = iconRes;
      })
    })
  }

}
