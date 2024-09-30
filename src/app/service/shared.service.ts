import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedEmitter } from '../interface/shared-emitter';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private inputStringSource = new Subject<SharedEmitter>();
  inputString$ = this.inputStringSource.asObservable();

  emitInputString(id : string,inputString: string) {
    this.inputStringSource.next({id: id, object : inputString});
  }
  
  unsubscribe() {
    this.inputStringSource.unsubscribe();
  }
}
