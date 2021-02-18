import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { userInfo } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userInfo: userInfo = null;

  constructor(private http: HttpClient) { }

  // Get user information
  getUserInfo(): userInfo {
    return this.userInfo ? this.userInfo : JSON.parse(localStorage.getItem('userInfo'));
  }

  // Set user information
  setUserInfo(userDetails): void {
    localStorage.setItem('userInfo', JSON.stringify(userDetails));
    this.userInfo = userDetails;
  }

  // Clear user Information
  clearUserInfo(): void {
    localStorage.removeItem('userInfo');
  }

  // Get user information
  // getUserInfo(): Observable<userInfo> {
  //   return this.http.get<userInfo>(`${environment.apiUrl}account/GetUserInfo/10`);
  // }
}
