import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  constructor(private http: HttpClient) { }

  //Get orders list from API
  getOrders(customerId) {
    return this.http.get(`${environment.apiUrl}customer/getCustomerOrder?loginId=${customerId}`);
  }

}
