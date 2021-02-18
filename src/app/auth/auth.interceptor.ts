import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError, delay } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  loaderCounter: number = 0;

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private profileService: ProfileService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Show loader
    this.loaderService.setLoaderState(true);
    this.loaderCounter++;

    //Check for url. If it is login url then return    
    if (request.url.includes('/token') || request.url.includes('/register')) {
      this.loaderCounter--;
      return next.handle(request);
    }

    const token = this.profileService.getUserInfo().access_token;

    //Add auth token to http header
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request).pipe(
      catchError(error => {

        //Handle unauthorised or session expired condition
        if (error.status === 401) {
          this.router.navigate(["/"]);
        }

        return throwError(error)
      }),
      finalize(() => {

        //Hide loader
        this.loaderCounter--;
        if (this.loaderCounter === 0) {
          this.loaderService.setLoaderState(false);
        }
      })
    );

  }
}
