import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showLogin: boolean = true;
  userName: string = "";
  password: string = "";
  email: string = "";
  mobileNum: number = null;
  name: string = "";
  registerPassword: string = "";

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private loginService: LoginService,
    private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  //validate and login user
  loginUser(): void {
    this.loaderService.setLoaderState(true);
    this.loginService.getAuthToken(this.userName, this.password).subscribe(loginResp => {
      console.log(loginResp)
      this.loaderService.setLoaderState(false);
      this.router.navigate(["/home"]);
    },
      loginErr => {
        this.loaderService.setLoaderState(false);
        console.log(loginErr)
      });
  }

  registerUser(): void {

    this.loaderService.setLoaderState(true);
    this.registerService.registerUser(this.email, this.mobileNum, this.name, this.registerPassword).subscribe(registerResp => {
      console.log(registerResp)
      this.loaderService.setLoaderState(false);
    },
      registerErr => {
        this.loaderService.setLoaderState(false);
        console.log(registerErr)
      });
  }

}
