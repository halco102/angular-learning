import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private inputStringSource = new Subject<string>();
  inputString$ = this.inputStringSource.asObservable();

  emitInputString(inputString: string) {
    this.inputStringSource.next(inputString);
  }
  
}
