import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loaderState = new BehaviorSubject(false);

  constructor() { }

  //Get loader current state
  getLoaderState() {
    return this.loaderState.asObservable();
  }

  //Set loader state
  setLoaderState(state) {
    this.loaderState.next(state);
  }
}
