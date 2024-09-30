import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabComponent } from "./tab/tab.component";
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MainComponent } from './main/main.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabComponent, NgIf, NgFor, MatCardModule, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'WeatherApp';

  constructor() {}


}

