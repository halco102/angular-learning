import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TitleCasePipe } from '@angular/common';
import { NgFor } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { Observable } from 'rxjs';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, MatMenuModule, MatSlideToggleModule, TitleCasePipe, NgFor, MatInputModule, MatIconModule, SearchBarComponent, SearchBarComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent implements OnInit{

  constructor(private toogleEmit : SharedService) {}
  
  ngOnInit(): void {
    this.toogleEmit.emitInputString("toogleTemp", "metric");
  }

  public degreesUnit : string = "C";
  public tabTexts : string[] = ['blog', 'about']; 

  slideToggleChange(event : MatSlideToggleChange) {
    console.log("Event " , event.checked);
    if (event.checked) {
      this.degreesUnit = 'F';
      this.toogleEmit.emitInputString("toogleTemp", "imperial");
    }else {
      this.degreesUnit = 'C';
      this.toogleEmit.emitInputString("toogleTemp", "metric");
    }
  }

}
