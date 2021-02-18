import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  //Get products from API
  getProducts(productId) {
    return this.http.get(`${environment.apiUrl}home/getProducts?productCategoryId=${productId}`);
  }

  //Rent products from API
  rentProducts(products) {
    return this.http.post(`${environment.apiUrl}order/insertOrder`, products);
  }
}
