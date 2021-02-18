import { Injectable } from '@angular/core';
import { category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //Get category list from API
  getCatrgoryList(): Observable<category[]> {
    return this.http.get<category[]>(`${environment.apiUrl}supplier/getFilters`);
  }
}
