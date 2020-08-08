import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showLogin: boolean = true;

  constructor(
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit(): void {
  }

  //validate and login user
  loginUser(): void {
    this.loaderService.setLoaderState(true);

    setTimeout(() => {
      this.loaderService.setLoaderState(false);
      this.router.navigate(["/home"]);
    }, 5000);
  }

}
