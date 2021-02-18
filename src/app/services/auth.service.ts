import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userInfo } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: BehaviorSubject<userInfo> = new BehaviorSubject<userInfo>(null);
  userIsloggedIn = false;

  constructor() {
    this.setUserData(JSON.parse(localStorage.getItem('userInfo')));
  }

  // Get user data
  getUserData() {
    return this.user$.value;
  }

  // Set user data
  setUserData(data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
    this.user$.next(data);
    this.userIsloggedIn = data ? true : false;
  }

}
