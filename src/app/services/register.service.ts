import { Injectable } from '@angular/core';
import { token } from '../models/token.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(email, mobileNum, name, password) {
    const requestBody = {
      LoginID: null,
      EmailID: email,
      MobileNumber: mobileNum,
      LoginName: name,
      Password: password,
      RoleID: 3,
      Deleted: 0,
      LastLoginDateTime: new Date(),
      Role: "Supplier"
    };

    const headerOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post(`${environment.apiUrl}register/NewRegistration`, requestBody, headerOptions);
  }
}
