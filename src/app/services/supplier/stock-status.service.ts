import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { category } from "../../models/category.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockStatusService {

  constructor(private http: HttpClient) { }

  //Get stocks status from API
  getStocksStatus(supplierId) {
    return this.http.get(`${environment.apiUrl}supplier/getStockStatus?supplierLoginId=${supplierId}`);
  }
}
