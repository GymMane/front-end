import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderState: boolean = false;

  constructor() { }

  //Get loader current state
  getLoaderState() {
    return this.loaderState;
  }

  //Set loader state
  setLoaderState(state) {
    this.loaderState = state;
  }
}
