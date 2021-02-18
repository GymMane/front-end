import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { category } from "../../models/category.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyInventoryService {

  constructor(private http: HttpClient) { }

  //Get stocks from API
  getStocks(supplierId) {
    return this.http.get(`${environment.apiUrl}supplier/getStocks?supplierLoginId=${supplierId}`);
  }

  //Delete stock table row from API
  deleteStock(stockId): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}supplier/deleteStock?stockID=${stockId}`, {});
  }

  //Add products to inventory
  addProduct(tableData) {
    const requestBody = tableData;

    return this.http.post(`${environment.apiUrl}Supplier/insertStocks`, requestBody);
  }
}
