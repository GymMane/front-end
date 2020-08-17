import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyInventoryService {

  constructor(private http: HttpClient) { }

  addProduct() {
    const requestBody = {
      Name: "Dumbbell",
      ProductCategoryID: 2,
      QualityCategory: "Standard",
      Demand: "Medium",
      Description: "Basic Pedal",
      Quantity: 4,
      SupplierLoginID: 4,
      GymPIN: "MYS00003",
      Product: {
        ProductCategoryID: 1,
        GymPIN: "MYS00003",
        ProductPIN: 1,
        Image: "",
        MaterialType: "",
        WeightCategory: "",
        HeightWeightCombo: "",
        SupplierLoginID: 4
      }

    };

    const headerOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post(`${environment.apiUrl}Supplier/insertStocks`, requestBody, headerOptions);
  }
}
