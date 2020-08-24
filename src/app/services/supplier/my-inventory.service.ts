import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { category } from "../../models/category.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyInventoryService {

  constructor(private http: HttpClient) { }

  //Get stocks from API
  getStocks() {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const headerOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + token.access_token
      })
    }

    return this.http.get(`${environment.apiUrl}supplier/getStocks?supplierLoginId=10`, headerOptions);

  }

  //Get category list from API
  getCatrgoryList(): Observable<category[]> {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const headerOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + token.access_token
      })
    }

    return this.http.get<category[]>(`${environment.apiUrl}supplier/getFilters`, headerOptions);

  }

  //Delete stock table row from API
  deleteStock(stockId): Observable<boolean> {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const headerOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + token.access_token
      })
    }

    return this.http.post<boolean>(`${environment.apiUrl}supplier/deleteStock?stockID=${stockId}`, {}, headerOptions);

  }


  addProduct(tableData) {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const requestBody = tableData;

    const headerOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + token.access_token
      })
    }

    return this.http.post(`${environment.apiUrl}Supplier/insertStocks`, requestBody, headerOptions);
  }
}
