import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http'; 
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, HttpClientModule, NgIf, NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CardComponent<T>{

  constructor() {}

  @Input()
  cardTitle: string = "";

  @Input()
  data! : T;

  @Input()
  properties! : (keyof T)[];

  @Input()
  icon : string = "";
}
