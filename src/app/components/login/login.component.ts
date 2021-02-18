import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showLogin = true;
  showOtp = false;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private loginService: LoginService,
    private registerService: RegisterService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNum: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }

  // validate and login user
  loginUser(loginType): void {
    console.log(this.loginForm);
    const loginObj = loginType === 'login' ? this.loginForm.value : this.registerForm.value;
    this.loginService.getAuthToken(loginObj.email, loginObj.password).subscribe(loginResp => {
      console.log(loginResp);
      this.loaderService.setLoaderState(false);
      this.profileService.setUserInfo(loginResp);
      this.authService.setUserData(loginResp);
      if (JSON.parse(loginResp['userInfo']).User.RoleID === 2) {
        this.router.navigate(['/stock-status']);
      } else {
        this.router.navigate(['/home']);
      }
      this.showOtp = false;
      this.showLogin = true;
    },
      loginErr => {
        this.loaderService.setLoaderState(false);
        console.log(loginErr);
      });
  }

  // Register new user
  registerUser(): void {
    const registerObj = this.registerForm.value;

    this.loaderService.setLoaderState(true);
    this.registerService.registerUser(registerObj.email, registerObj.mobileNum, registerObj.userName, registerObj.password).subscribe(registerResp => {
      console.log(registerResp);
      if (registerResp === 'Success') {
        this.loginUser('register');
      }
      this.loaderService.setLoaderState(false);
    },
      registerErr => {
        this.loaderService.setLoaderState(false);
        console.log(registerErr);
      });
  }

  // Send otp to user
  sendOtp() {
    this.loaderService.setLoaderState(true);
    const registerObj = this.registerForm.value;

    this.registerService.sendOtp(registerObj.email, registerObj.mobileNum, registerObj.userName).subscribe(otpResp => {
      console.log(otpResp);
      if (otpResp === 'OTP Sentsuccessfully') {
        this.showOtp = true;
      }
      this.loaderService.setLoaderState(false);
    },
      otpErr => {
        this.loaderService.setLoaderState(false);
        console.log(otpErr);
      });
  }

  // Verfiy otp send to user
  verifyOtp() {
    this.loaderService.setLoaderState(true);
    const registerObj = this.registerForm.value;

    this.registerService.verifyOtp(registerObj.email, registerObj.mobileNum, registerObj.otp).subscribe(otpResp => {
      console.log(otpResp);
      if (otpResp) {
        this.registerUser();
      }
      this.loaderService.setLoaderState(false);
    },
      otpErr => {
        this.loaderService.setLoaderState(false);
        console.log(otpErr);
      });
  }

}
