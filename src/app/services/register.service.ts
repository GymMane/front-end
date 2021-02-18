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

  //Register new user
  registerUser(email, mobileNum, name, password) {
    const requestBody = {
      LoginName: name,
      Password: password,
      EmailID: email,
      MobileNumber: mobileNum,
      RoleID: 3
    };

    return this.http.post(`${environment.apiUrl}register/NewRegistration`, requestBody);
  }

    //Send otp number from API
    sendOtp(mailId, mobileNum, userName) {
      return this.http.post(`${environment.apiUrl}register/sendotp?p_EmailID=${mailId}&p_MobileNumber=${mobileNum}&p_LoginName=${userName}`, {});
    }

  //Verify otp number from API
  verifyOtp(mailId, mobileNum, otp) {
    return this.http.post(`${environment.apiUrl}register/VerifyOTP?p_EmailID=${mailId}&p_MobileNumber=${mobileNum}&p_OTP=${otp}`, {});
  }
}
