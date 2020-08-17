import { Injectable } from '@angular/core';
import { token } from '../models/token.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getAuthToken(userName, password) {
    const requestBody = `username=${userName}&password=${password}&grant_type=password`;

    const headerOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(`http://api.gymmane.com/token`, requestBody, headerOptions);
  }
}
