import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../interface/SearchService';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(private searchEvent : SharedService) {}
  
  @Input({required: true}) 
  public placeholderText = '';

  public inputString: string = "";

  searchClickEvent() : void {
    console.log("Emit ", this.inputString);
    this.searchEvent.emitInputString("searchEmit", this.inputString);
  }
}
