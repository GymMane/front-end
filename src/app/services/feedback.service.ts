import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  //Give feedback to the website
  giveFeedback(feedback): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}feedback/insertFeedback`, feedback);
  }
}
